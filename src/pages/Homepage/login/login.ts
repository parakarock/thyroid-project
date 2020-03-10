import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  Events,
  Form
} from "ionic-angular";
import { NurseHomePage } from "../../Nursepage/nurse-home/nurse-home";
import { Http, Response, Headers, ResponseOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { DoctorHomePage } from "../../Doctorpage/doctor-home/doctor-home";
import { PatientHomePage } from "../../Patientpage/patient-home/patient-home";
import { AdminhomePage } from "../../AdminPage/adminhome/adminhome";
import { GlobalProvider } from "../../../providers/global/global";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  formgroup: FormGroup;
  username:AbstractControl;
  password:AbstractControl;
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
    public formBuilder:FormBuilder
  ) {
    this.formgroup = formBuilder.group({
      username: ['', Validators.required],
     
    });
   this.username = this.formgroup.controls['username'];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  async onClickLoginButton() {
    console.log("input : " + this.usernameInput);
    let body = { username: this.usernameInput, password: this.usernameInput };
    console.log("body : " + body);
    await this.http
      .post("http://10.80.34.218:8000/login.php?method=login&role=guest", body)
      .map(res => res.json())
      .subscribe(
        data => {
          this.data = JSON.stringify(data);
          this.global.name = data.title + data.firstname + " " + data.lastname;
          console.log(this.global.name);

          this.nurse = this.global.role.findIndex(
            role_name => role_name.role_name === "nurse"
          );
          this.doctor = this.global.role.findIndex(
            role_name => role_name.role_name === "doctor"
          );
          this.patient = this.global.role.findIndex(
            role_name => role_name.role_name === "patient"
          );
          if (this.doctor >= 0) {
            this.events.publish("user:doctor");
            this.navCtrl.setRoot(DoctorHomePage);
          }else if(this.nurse >= 0){
            this.events.publish("user:nurse");
            this.navCtrl.setRoot(NurseHomePage);
          }else if(this.patient >= 0){
            this.events.publish("user:patient");
            this.navCtrl.setRoot(PatientHomePage);
          }
        },
        error => {
          console.log(error);
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
}
