import { FollowuptreatmentresultPage } from '../followuptreatmentresult/followuptreatmentresult';
import { IodineresultPage } from '../iodineresult/iodineresult';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HomePage } from '../../Homepage/home/home';
import {TestresultPage } from '../../Doctorpage/ผลการตรวจ/testresult/testresult';
import {HealthdatahomePage } from '../../Nursepage/ข้อมูลด้านสุขภาพ/healthdatahome/healthdatahome';
import {ChangepassPage } from '../../changepass/changepass';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events) {
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
