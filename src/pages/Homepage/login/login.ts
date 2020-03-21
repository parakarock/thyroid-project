import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  Events,
  Form,
  ToastController
} from "ionic-angular";
import { NurseHomePage } from "../../Nursepage/nurse-home/nurse-home";
import {
  Http,
  Response,
  Headers,
  ResponseOptions,
  RequestOptions
} from "@angular/http";
import "rxjs/add/operator/map";
import { DoctorHomePage } from "../../Doctorpage/doctor-home/doctor-home";
import { PatientHomePage } from "../../Patientpage/patient-home/patient-home";
import { AdminhomePage } from "../../AdminPage/adminhome/adminhome";
import { GlobalProvider } from "../../../providers/global/global";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  formgroup: FormGroup;
  username;
  password;
  usernameInput: string;
  role: any;
  nurse;
  doctor;
  patient;
  name;
  data;
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

    this.username = this.formgroup.controls["username"];
    this.password = this.formgroup.controls["password"];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  async onClickLoginButton() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = { username: this.usernameInput, password: this.usernameInput };
    console.log("body : " + body);
    await this.http
      .post(
        "http://192.168.43.140:8000/login.php?method=login&role=guest",
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if (data.result) {
            this.showToastWithCloseButton(data.result);
          } else {
            this.global.name =
              data[0].title + data[0].firstname + " " + data[0].lastname;
            this.global.role = data[1];

            if (
              data[1].findIndex(
                role_name => role_name.role_name === "doctor"
              ) >= 0
            ) {
              this.events.publish("user:doctor");
              this.navCtrl.setRoot(DoctorHomePage);
            } else if (
              data[1].findIndex(role_name => role_name.role_name === "nurse") >=
              0
            ) {
              this.events.publish("user:nurse");
              this.navCtrl.setRoot(NurseHomePage);
            } else if (
              data[1].findIndex(
                role_name => role_name.role_name === "patient"
              ) >= 0
            ) {
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
}
