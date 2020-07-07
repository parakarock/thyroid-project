import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { GlobalProvider } from "../../../../providers/global/global";
import {
  Http,
  Headers,
  RequestOptions
} from "@angular/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import moment from 'moment';
import 'moment/locale/TH';
/**
 * Generated class for the EditgeneralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-editgeneral",
  templateUrl: "editgeneral.html"
})
export class EditgeneralPage {
  formgroup: FormGroup;
  hospitals;
  showNameHosIn: boolean = false;
  showNameHosOut: boolean = false;
  startMin: any;
  startMax: any;
  dataReturn;
  age = moment().diff(moment(this.navParams.get("date"),"YYYY-MM-DD").subtract(543, 'y'), 'years');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private http: Http
  ) {
    this.startMin = moment().add(443, 'y').format("YYYY");
    this.startMax = moment().add(543, 'y').format("YYYY");
    this.formgroup = formBuilder.group({
      title: [navParams.get("title"), Validators.required],
      fname: [
        navParams.get("firstname"),
        Validators.compose([
          Validators.required,
          Validators.pattern("^[ก-๏sa-zA-Z]+$")
        ])
      ],
      lname: [
        navParams.get("lastname"),
        Validators.compose([
          Validators.required,
          Validators.pattern("^[ก-๏sa-zA-Z]+$")
        ])
      ],
      birthday: [navParams.get("date"), Validators.required],
      idCard: [
        navParams.get("idcard"),
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(13),
          Validators.pattern("[0-9a-zA-Z]+")
        ])
      ],
      sex: [navParams.get("gender"), Validators.required],
      National: [
        navParams.get("national"),
        Validators.compose([
          Validators.required,
          Validators.pattern("^[ก-๏sa-zA-Z]+$")
        ])
      ],
      status: [navParams.get("status"), Validators.required],
      tel: [
        navParams.get("tel"),
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          Validators.pattern("[0-9]+")
        ])
      ],

      from_id: [navParams.get("hninput"), Validators.pattern("[0-9]+")],
      to_id: [navParams.get("hnoutput"), Validators.pattern("[0-9]+")],
      Hos_base_id: [
        navParams.get("hnbuu"),
        Validators.compose([Validators.required, Validators.pattern("[0-9]+")])
      ],
      from_name1: [navParams.get("input"),],
      to_name1: [navParams.get("output"),],
      from_name2: ["", Validators.pattern("^[ก-๏sa-zA-Z]+$")],
      to_name2: ["", Validators.pattern("^[ก-๏sa-zA-Z]+$")]
    });
  }

  updateAge(){
    this.age = moment().diff(moment(this.formgroup.controls.birthday.value,"YYYY-MM-DD").subtract(543, 'y'), 'years');
  }
  doUpdate() {
    console.log(this.formgroup.value);
    console.log(this.formgroup.valid);
  }
  getHospital() {
    this.http
      .get(
        "http://"+this.global.getIP()+"/admin.php?method=get_hospital&role="+this.global.getSelectRole()
      )
      .map(res => res.json())
      .subscribe(
        data => {
          let hosin = this.navParams.get("input")
          let hosout = this.navParams.get("output")
          this.hospitals = data;
          this.addOtherItem(this.hospitals);
          if(this.hospitals.find(hospital => hospital.hos_name === hosin)||hosin===""){
      
          }else{
            this.hospitals.unshift({
              hos_name: hosin 
            }); 
          }
          if(this.hospitals.find(hospital => hospital.hos_name === hosout)||hosout===""){
      
          }else{
            this.hospitals.unshift({
              hos_name: hosout 
            }); 
          }
          console.log(this.hospitals);
        },
        error => {
          console.log(error);
        }
      );
  }
  addOtherItem(arr) {
    arr.push({
      hos_name: "อื่นๆ"
    });
    arr.push({
      hos_name: ""
    });
  }
  showHosIn(hosname) {
    if (hosname === "อื่นๆ") {
      this.showNameHosIn = !this.showNameHosIn;
    } else {
      this.showNameHosIn = false;
    }
  }
  showHosOut(hosname) {
    if (hosname === "อื่นๆ") {
      this.showNameHosOut = !this.showNameHosOut;
    } else {
      this.showNameHosOut = false;
    }
  }
  updateData() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = {
      idcard: this.formgroup.controls.idCard.value,
      title: this.formgroup.controls.title.value,
      firstname: this.formgroup.controls.fname.value,
      lastname: this.formgroup.controls.lname.value,
      dof: moment(this.formgroup.controls.birthday.value).format("YYYY-MM-DD"),
      gender: this.formgroup.controls.sex.value,
      national: this.formgroup.controls.National.value,
      status: this.formgroup.controls.status.value,
      phone: this.formgroup.controls.tel.value,
      from_id: this.formgroup.controls.from_id.value,
      to_id: this.formgroup.controls.to_id.value,
      Hos_base_id: this.formgroup.controls.Hos_base_id.value,
      from_name: (this.formgroup.controls.from_name1.value !== "อื่นๆ" &&
      this.formgroup.controls.from_name1.value) ||
    this.formgroup.controls.from_name2.value,
      to_name: (this.formgroup.controls.to_name1.value !== "อื่นๆ" &&
      this.formgroup.controls.to_name1.value) ||
    this.formgroup.controls.to_name2.value
    };
    this.navCtrl.getPrevious().data.formData = body
    console.log("body : " + body);
    this.http
      .post(
        "http://"+this.global.getIP()+"/healthdata.php?method=update_profile&role="+this.global.getSelectRole(),
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if(data.result){
            if(this.global.getpatientID() === this.global.getLoginID()){
              this.global.setSexLogin(this.formgroup.controls.sex.value)
            }
           this.global.setSex(this.formgroup.controls.sex.value);
            this.presentAlert(data.result);
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad EditgeneralPage");
    this.getHospital();
  }

  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      title: "ยืนยันการแก้ไขข้อมูล",
      message: "",
      buttons: [
        {
          text: "ยกเลิก",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "ยืนยัน",
          handler: () => {
            this.updateData();
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
  async presentAlert(txt: string) {
    let alert = await this.alertCtrl.create({
      title: 'การแจ้งเตือน',
      subTitle: txt,
      buttons: ['Ok']
    });
    alert.present();
  }
}

