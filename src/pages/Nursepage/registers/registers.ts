import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams,AlertController, } from "ionic-angular";
import { Http, Headers, RequestOptions, ResponseOptions } from "@angular/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GlobalProvider } from "../../../providers/global/global";
import { NurseHomePage } from "../../Nursepage/nurse-home/nurse-home";

/**
 * Generated class for the RegistersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-registers",
  templateUrl: "registers.html"
})
export class RegistersPage {
  formgroup: FormGroup;

  hospitals;
  showNameHosIn: boolean = false;
  showNameHosOut: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public global: GlobalProvider,
    public http: Http,
    public alertCtrl: AlertController,
  ) {
    this.formgroup = formBuilder.group({
      from_id: ["", Validators.pattern("[0-9]+")],
      to_id: ["", Validators.pattern("[0-9]+")],
      Hos_base_id: [
        "",
        Validators.compose([Validators.required, Validators.pattern("[0-9]+")])
      ],
      from_name1: ["",],
      to_name1: ["",],
      from_name2: ["", Validators.pattern("^[ก-๏sa-zA-Z]+$")],
      to_name2: ["", Validators.pattern("^[ก-๏sa-zA-Z]+$")]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegistersPage");
    this.getHospital();
  }
  doSignup() {
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
          this.hospitals = data;
          this.addOtherItem(this.hospitals);
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
  async insertdata() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      idcard: this.navParams.get("idCard"),
      title: this.navParams.get("title"),
      firstname: this.navParams.get("fname"),
      lastname: this.navParams.get("lname"),
      dof: this.navParams.get("birthday"),
      gender: this.navParams.get("sex"),
      national: this.navParams.get("National"),
      status: this.navParams.get("status"),
      phone: this.navParams.get("tel"),
      from_id: this.formgroup.controls.from_id.value,
      to_id: this.formgroup.controls.to_id.value,
      Hos_base_h_id: this.formgroup.controls.Hos_base_id.value,
      from_name:
        (this.formgroup.controls.from_name1.value !== "อื่นๆ" &&
          this.formgroup.controls.from_name1.value) ||
        this.formgroup.controls.from_name2.value,
      to_name:
        (this.formgroup.controls.to_name1.value !== "อื่นๆ" &&
          this.formgroup.controls.to_name1.value) ||
        this.formgroup.controls.to_name2.value
    });
    console.log(body);
    await this.http
      .post("http://"+this.global.getIP()+"/register.php?method=insert_pantient&role="+this.global.getSelectRole(), body, options)
      .map(res => res.json())
      .subscribe(
        data => {
          if(data.result){
             this.presentAlert(data.result);
          }else{
            alert(1)
            this.presentAlertUser("Username : "+data[2].username+"<br>"+"Password : "+data[2].password);
            alert(2)
            this.global.setRound(data[1]);
            alert(3)
            this.global.setpatientID(data[0].person_id);
            alert(4)
            this.global.setpatientName(data[0].fullname);
            alert(5)
            this.global.setSex(data[0].gender);
            alert(6)
            this.global.setShowMenuMain(true);
            this.navCtrl.remove(this.navCtrl.getActive().index - 1, 2);
          }

        },
        error => {
          alert("fuck")
          console.log(error);
        }
      );
  }

 async presentConfirm() {
    let alert = await this.alertCtrl.create({
      title: 'ยืนยันการสมัคร',
      message: '',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
           this.insertdata();
          }
        }
      ]
    });
    alert.present();
  }
  async presentAlertUser(txt: string) {
    let alert = await this.alertCtrl.create({
      title: 'รหัสผ่านของผู้ป่วย',
      subTitle: txt,
      buttons: ['Ok']
    });
    alert.present();
  }
  async presentAlert(txt: string) {
    let alert = await this.alertCtrl.create({
      title: 'เกิดข้อผิดพลาด',
      subTitle: txt,
      buttons: ['Ok']
    });
    alert.present();
  }
}
