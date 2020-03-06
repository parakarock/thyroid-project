import { DoctorHomePage } from '../../Doctorpage/doctor-home/doctor-home';
import { LabtestresultPage } from '../ผลการตรวจทางห้องแลป/labtestresult/labtestresult';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage} from '../../Homepage/home/home'
import { HealthdatahomePage } from '../ข้อมูลด้านสุขภาพ/healthdatahome/healthdatahome';
import { PreparehomePage } from '../ขั้นตอนการเตรียมตัว/preparehome/preparehome';
import { LoginPage } from '../../Homepage/login/login';

/**
 * Generated class for the NurseHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nurse-home',
  templateUrl: 'nurse-home.html',
})
export class NurseHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NurseHomePage');
    // this.events.publish('user:nurse');
  }
  onClickRegister(){
    this.navCtrl.push(RegisterPage);
  }
  onClickLogoutButton(){
    this.events.publish('user:guest');
    this.navCtrl.setRoot(HomePage);
  }

  
  ChangePass(){
    this.navCtrl.push(LoginPage);
  }

  navigateToLabTest(){
    this.navCtrl.push(LabtestresultPage);
  }

  goDoctorPage(){
    this.navCtrl.push(DoctorHomePage);
  }

  onClickHealthdatahome(){
    this.navCtrl.push(HealthdatahomePage);
  }
  onClickPreparehome(){
    this.navCtrl.push(PreparehomePage);
  }

}
