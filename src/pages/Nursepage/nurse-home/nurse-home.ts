import { DoctorHomePage } from "../../Doctorpage/doctor-home/doctor-home";
import { LabtestresultPage } from "../labtestresult/labtestresult";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { RegisterPage } from "../register/register";
import { HomePage } from "../../Homepage/home/home";
import { HealthdatahomePage } from "../ข้อมูลด้านสุขภาพ/healthdatahome/healthdatahome";
import { PreparehomePage } from "../ขั้นตอนการเตรียมตัว/preparehome/preparehome";
import { TestresultPage } from "../ผลการตรวจ/testresult/testresult";
import { GlobalProvider } from "../../../providers/global/global";


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
    public global: GlobalProvider
  ) {}
  role;
  pic;

  ionViewDidLoad() {
    console.log("ionViewDidLoad NurseHomePage");
    // this.events.publish('user:nurse');
  }
  ionViewWillEnter(){
    this.role = this.global.role;
    this.pic = this.global.role[0];
  }
  onClickRegister() {
    this.navCtrl.push(RegisterPage);
  }
  onClickLogoutButton() {
    this.events.publish("user:guest");
    this.navCtrl.setRoot(HomePage);
  }

  navigateToLabTest() {
    this.navCtrl.push(LabtestresultPage);
  }

  goDoctorPage() {
    this.navCtrl.push(DoctorHomePage);
  }

  onClickHealthdatahome() {
    this.navCtrl.push(HealthdatahomePage);
  }
  onClickPreparehome() {
    this.navCtrl.push(PreparehomePage);
  }
  onClicktestresult() {
    this.navCtrl.push(TestresultPage);
  }

  onChange($event) {
    console.log($event);
  }
}
