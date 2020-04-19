import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  Events,
  ToastController
} from "ionic-angular";
import { NurseHomePage } from "../../Nursepage/nurse-home/nurse-home";
import {
  Http,
  Headers,
  RequestOptions
} from "@angular/http";

import "rxjs/add/operator/map";
import { DoctorHomePage } from "../../Doctorpage/doctor-home/doctor-home";
import { PatientHomePage } from "../../Patientpage/patient-home/patient-home";
import { AdminhomePage } from "../../AdminPage/adminhome/adminhome";
import { GlobalProvider } from "../../../providers/global/global";
import { ChangepassLogin1Page } from "../../changepass-login1/changepass-login1"
import {
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  formgroup: FormGroup;

  @ViewChild("usernameInput") mUsername;
  @ViewChild("passwordInput") mPassword;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public events: Events,
    private http: Http,
    public global: GlobalProvider,
    public formBuilder: FormBuilder,
    public toastController: ToastController
  ) {
    this.formgroup = formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    // this.mUsername = this.formgroup.controls["username"];
    // this.mPassword = this.formgroup.controls["password"];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  async onClickLoginButton() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = { username: this.mUsername.value, password: this.mUsername.value };
    console.log("body : " + body);
    await this.http
      .post(
        "http://"+this.global.getIP()+"/login.php?method=login&role=guest",
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if (data.result) {
            // this.showToastWithCloseButton(data.result);
            this.presentAlert(data.result);
          } else {
            this.global.setname(data[0].title + data[0].firstname + " " + data[0].lastname)
            this.global.setLoginID(data[0].person_id)
            this.global.setrole(data[1])
            if (
              data[1].findIndex(
                role_name => role_name.role_name === "หมอ"
              ) >= 0
            ) {
              this.events.publish("user:doctor");
              this.navCtrl.setRoot(DoctorHomePage);
            } else if (
              data[1].findIndex(role_name => role_name.role_name === "พยาบาล") >=
              0
            ) {
              this.events.publish("user:nurse");
              this.navCtrl.setRoot(NurseHomePage);
            } else if (
              data[1].findIndex(
                role_name => role_name.role_name === "ผู้ป่วย"
              ) >= 0
            ) {
              this.global.setpatientName(data[0].title + data[0].firstname + " " + data[0].lastname)
              this.global.setpatientID(data[0].person_id)
              this.events.publish("user:patient");
              this.navCtrl.setRoot(PatientHomePage);
            }
          }
        },
        error => {
          console.log(error);
          alert(error);
        }
      );
  }
  gonPage() {
    this.navCtrl.setRoot(NurseHomePage);
  }
  goDoctorPage() {
    this.navCtrl.setRoot(DoctorHomePage);
  }
  go() {
    this.navCtrl.setRoot(PatientHomePage);
  }
  admin() {
    this.navCtrl.setRoot(AdminhomePage);
  }
  doSignup() {
    console.log(this.formgroup.value);
    console.log(this.formgroup.valid);
  }
  async showToastWithCloseButton(txt: string) {
    const toast = await this.toastController.create({
      message: txt,
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    toast.present();
  }
  async presentAlert(txt: string) {
    let alert = await this.alertCtrl.create({
      title: 'เกิดข้อผิดพลาด',
      subTitle: txt,
      buttons: ['Ok']
    });
    alert.present();
  }

  changePass(){
    this.navCtrl.push(ChangepassLogin1Page);
  }

}
