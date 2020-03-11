import { FollowuptreatmentresultPage } from '../followuptreatmentresult/followuptreatmentresult';
import { IodineresultPage } from '../iodineresult/iodineresult';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { HomePage } from '../../Homepage/home/home';
import {TestresultPage } from '../../Doctorpage/ผลการตรวจ/testresult/testresult';
import {HealthdatahomePage } from '../../Nursepage/ข้อมูลด้านสุขภาพ/healthdatahome/healthdatahome';
import {ChangepassPage } from '../../changepass/changepass';
import { NurseHomePage } from "../../Nursepage/nurse-home/nurse-home";
import { PatientHomePage } from "../../Patientpage/patient-home/patient-home";

/**
 * Generated class for the DoctorHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-home',
  templateUrl: 'doctor-home.html',
})
export class DoctorHomePage {
  roles;
  name;
  status: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events,public menu: MenuController,) {
  }
  selectRole() {
    if (this.status === "nurse") {
      this.events.publish("user:nurse");
      this.menu.enable(false);
      this.navCtrl.setRoot(NurseHomePage);
    }
    if (this.status === "patient") {
      this.events.publish("user:patient");
      this.menu.enable(false);
      this.navCtrl.setRoot(PatientHomePage);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorHomePage');
  }
  healthdatahome(){
    this.navCtrl.push(HealthdatahomePage);
  }

  testresult(){
    this.navCtrl.push(TestresultPage);
  }
  navigateIodineResult(){
    this.navCtrl.push(IodineresultPage);
  }

  navigateFollowUpResult(){
    this.navCtrl.push(FollowuptreatmentresultPage);
  }
  onClickLogoutButton(){
    this.events.publish('user:guest');
    this.navCtrl.setRoot(HomePage);
  }

  ChangePass(){
    this.navCtrl.push(ChangepassPage);
  }
}
