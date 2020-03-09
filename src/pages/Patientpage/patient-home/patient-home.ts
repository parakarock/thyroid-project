import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { HealthdatahomePage } from '../../Nursepage/ข้อมูลด้านสุขภาพ/healthdatahome/healthdatahome';
import { TestresultPage } from '../../Doctorpage/ผลการตรวจ/testresult/testresult';
import { PreparehomePage } from '../../Nursepage/ขั้นตอนการเตรียมตัว/preparehome/preparehome';
import { IodineresultPage } from '../../Doctorpage/iodineresult/iodineresult';
import { FollowuptreatmentresultPage } from '../../Doctorpage/followuptreatmentresult/followuptreatmentresult';
import { HomePage } from '../../Homepage/home/home';
import { ChangepassPage } from '../../changepass/changepass';

/**
 * Generated class for the PatientHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-home',
  templateUrl: 'patient-home.html',
})
export class PatientHomePage {
 
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientHomePage');
  }
  
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

  healthdatahome(){
    this.navCtrl.push(HealthdatahomePage);
  }

  testresult(){
    this.navCtrl.push(TestresultPage);
  }

  Preparehome(){
    this.navCtrl.push(PreparehomePage);
  }
  Iodineresult(){
    this.navCtrl.push(IodineresultPage);
  }
  follow(){
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
