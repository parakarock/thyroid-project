import { DoctorHomePage } from "../../Doctorpage/doctor-home/doctor-home";
import { LabtestresultPage } from "../../Nursepage/ผลการตรวจทางห้องแลป/labtestresult/labtestresult";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events,ViewController,MenuController } from "ionic-angular";
import { RegisterPage } from "../register/register";
import { HomePage } from "../../Homepage/home/home";
import { HealthdatahomePage } from "../ข้อมูลด้านสุขภาพ/healthdatahome/healthdatahome";
import { PreparehomePage } from "../ขั้นตอนการเตรียมตัว/preparehome/preparehome";
import { TestresultPage } from "../../Doctorpage/ผลการตรวจ/testresult/testresult";
import { GlobalProvider } from "../../../providers/global/global";
import { QrcodePage } from "../../qrscan/qrscan";
import { PatientHomePage } from "../../Patientpage/patient-home/patient-home";



import { ChangepassPage } from "../../changepass/changepass";
/**
 * Generated class for the NurseHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-nurse-home",
  templateUrl: "nurse-home.html"
})
export class NurseHomePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public viewCtrl: ViewController,
    public menu: MenuController,
    public global: GlobalProvider
  ) {}
  roles;
  name;
  status: string;

  ionViewDidLoad() {
    console.log("ionViewDidLoad NurseHomePage");
    this.roles = this.global.getrole();
    this.name = this.global.getname();
  }
  ionViewWillEnter() {}

  selectRole() {
    if (this.status === "patient") {
      this.events.publish("user:patient");
      this.menu.enable(false);
      this.navCtrl.setRoot(PatientHomePage);
    }
    if (this.status === "doctor") {
      this.events.publish("user:doctor");
      this.menu.enable(false);
      this.navCtrl.setRoot(DoctorHomePage);
    }
  }

  onClickRegister() {
    this.navCtrl.push(RegisterPage);
  }
  onClickLogoutButton() {
    this.events.publish("user:guest");
    this.navCtrl.setRoot(HomePage);
  }

  navigateToLabTest() {
    this.navCtrl.push(QrcodePage,{page: "LabtestresultPage"});
  }

  goDoctorPage() {
    this.navCtrl.push(DoctorHomePage);
  }

  ChangePass() {
    this.navCtrl.push(ChangepassPage);
  }


  onClickHealthdatahome() {
    if(this.global.checkCanUse()){
      this.navCtrl.push(HealthdatahomePage);
    }else{
       this.navCtrl.push(QrcodePage,{page: "HealthdatahomePage"});
    }
  }
  onClickPreparehome() {
    this.navCtrl.push(QrcodePage,{page: "PreparehomePage"});
  }

  onChange($event) {
    console.log($event);
  }
}
