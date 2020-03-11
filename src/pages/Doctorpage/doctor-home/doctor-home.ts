import { FollowuptreatmentresultPage } from '../followuptreatmentresult/followuptreatmentresult';
import { IodineresultPage } from '../iodineresult/iodineresult';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorHomePage');
  }

  navigateIodineResult(){
    this.navCtrl.push(IodineresultPage);
  }

  navigateFollowUpResult(){
    this.navCtrl.push(FollowuptreatmentresultPage);
  }

}
