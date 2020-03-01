import { DoctorHomePage } from '../../Doctorpage/doctor-home/doctor-home';
import { LabtestresultPage } from '../labtestresult/labtestresult';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage} from '../../Homepage/home/home'

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

  navigateToLabTest(){
    this.navCtrl.push(LabtestresultPage);
  }

  goDoctorPage(){
    this.navCtrl.push(DoctorHomePage);
  }

}
