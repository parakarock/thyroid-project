import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams,AlertController, } from "ionic-angular";
import { Http, Headers, RequestOptions, ResponseOptions } from "@angular/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
      from_name2: ["", Validators.pattern("^[ก-๏s]+$")],
      to_name2: ["", Validators.pattern("^[ก-๏s]+$")]
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
        "http://192.168.43.140:8000/admin.php?method=get_hospital&role=nurse"
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
  insertdata() {
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
    this.http
      .post("http://192.168.43.140:8000/register.php?method=insert_pantient&role=nurse", body, options)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          if(data.username&&data.password){
            this.presentAlertUser("Username : "+data.username+"<br>"+"Password : "+data.password);
            this.navCtrl.remove(this.navCtrl.getActive().index - 1, 2);
          }else{
            this.presentAlert(data.result);
          }
          
        },
        error => {
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
           this.navCtrl.remove(this.navCtrl.getActive().index - 1, 2);
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
