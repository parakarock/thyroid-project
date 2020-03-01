import { EdittreatmentresultPage } from '../edittreatmentresult/edittreatmentresult';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FollowuptreatmentresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-followuptreatmentresult',
  templateUrl: 'followuptreatmentresult.html',
})
export class FollowuptreatmentresultPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowuptreatmentresultPage');
  }

  EditTreatmentResult(){
    this.navCtrl.push(EdittreatmentresultPage);
  }
}
