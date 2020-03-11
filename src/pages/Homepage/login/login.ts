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
// myfrom: FormGroup;
  usernameInput: string;
  role: any;
 formgroup: FormGroup;
 username:AbstractControl;
 password:AbstractControl;

  @ViewChild("passwordInput") mPassword;
  constructor(public navCtrl: NavController,public navParams: NavParams,public alertCtrl: AlertController,public events: Events,private http: Http, public formBuilder:FormBuilder
  ) {

    this.formgroup = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
     
    });
   this.username = this.formgroup.controls['username'];
   this.password = this.formgroup.controls['password'];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  onClickLoginButton() {
    console.log('input : '+this.usernameInput);
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new ResponseOptions({ headers: headers });
    let body = { idcard: this.usernameInput };
    this.http
      .post("http://localhost:8000/getuser.php", body, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.role = data.role_name;
        console.log('output : '+this.role);
      },error=>{
        console.log(error);
      });


      
    // if(this.mUsername.value == "example"&&this.mPassword.value == "1234"){
    //   this.navCtrl.push(TabsPage);
    // }else{
    //   const alert = this.alertCtrl.create({
    //   title: 'Fail to Login',
    //   subTitle: 'Your username or password is incorrect',
    //   buttons: ['OK']
    // });
    // alert.present();
    // }
    // if (this.role.role_name == "nurse") {
    //   this.events.publish("user:nurse");
    //   this.navCtrl.setRoot(NurseHomePage);
    // } else {
    //   const alert = this.alertCtrl.create({
    //     title: "Fail to Login",
    //     subTitle: "Your username or password is incorrect",
    //     buttons: ["OK"]
    //   });
    //   alert.present();
    // }

    // this.navCtrl.popToRoot();
    // this.navCtrl.push(NurseTabsPage,{text:true});
    this.events.publish("user:nurse");
    this.navCtrl.setRoot(NurseHomePage);
  }

   goDoctorPage(){
    this.navCtrl.setRoot(DoctorHomePage);
  }
  go(){
    this.navCtrl.setRoot(PatientHomePage);
  }
  admin(){
    this.navCtrl.setRoot(AdminhomePage);
  }
  doSignup(){
    console.log(this.formgroup.value);
    console.log(this.formgroup.valid);   
}
}