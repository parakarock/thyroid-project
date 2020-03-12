import { GenPage } from '../../gen/gen';
import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Slides,MenuController } from "ionic-angular";
import { Events } from "ionic-angular";
import { HealthdatahomePage } from "../../Nursepage/ข้อมูลด้านสุขภาพ/healthdatahome/healthdatahome";
import { TestresultPage } from "../../Doctorpage/ผลการตรวจ/testresult/testresult";
import { PreparehomePage } from "../../Nursepage/ขั้นตอนการเตรียมตัว/preparehome/preparehome";
import { IodineresultPage } from "../../Doctorpage/iodineresult/iodineresult";
import { FollowuptreatmentresultPage } from "../../Doctorpage/followuptreatmentresult/followuptreatmentresult";
import { HomePage } from "../../Homepage/home/home";
import { ChangepassPage } from "../../changepass/changepass";
import { DoctorHomePage } from "../../Doctorpage/doctor-home/doctor-home";
import { NurseHomePage } from "../../Nursepage/nurse-home/nurse-home";
import { GlobalProvider } from "../../../providers/global/global";

/**
 * Generated class for the PatientHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-patient-home",
  templateUrl: "patient-home.html"
})
export class PatientHomePage {
  roles;
  name;
  status: string;
  @ViewChild(Slides) slides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public menu: MenuController,
    public global: GlobalProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad PatientHomePage");
    this.roles = this.global.getrole();
    this.name = this.global.getname();
  }

  selectRole() {
    if (this.status === "nurse") {
      this.events.publish("user:nurse");
      this.menu.enable(false);
      this.navCtrl.setRoot(NurseHomePage);
    }
    if (this.status === "doctor") {
      this.events.publish("user:doctor");
      this.menu.enable(false);
      this.navCtrl.setRoot(DoctorHomePage);
    }
  }


  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log("Current index is", currentIndex);
  }

  healthdatahome() {
    this.navCtrl.push(HealthdatahomePage);
  }

  testresult() {
    this.navCtrl.push(TestresultPage);
  }

  Preparehome() {
    this.navCtrl.push(PreparehomePage);
  }
  Iodineresult() {
    this.navCtrl.push(IodineresultPage);
  }
  follow() {
    this.navCtrl.push(FollowuptreatmentresultPage);
  }
  onClickLogoutButton() {
    this.events.publish("user:guest");
    this.navCtrl.setRoot(HomePage);
  }
  ChangePass() {
    this.navCtrl.push(ChangepassPage);
  }

  genqrcode(){
    this.navCtrl.push(GenPage);
  }
}
