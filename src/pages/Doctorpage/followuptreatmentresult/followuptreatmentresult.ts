import { EdittreatmentresultPage } from '../edittreatmentresult/edittreatmentresult';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../../providers/global/global";
import moment from 'moment';
import 'moment/locale/TH';

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

  public obj:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,global: GlobalProvider) {
    this.obj = [
      {
        date : "12 ธันวาคม 2563",
        Sympton: "ผอมแห้ง แรงน้อย",
        fT4: 50.6,
        TSH: 20.5,
        Solution: "พักรักษาอาการ"
      },
      {
        date : "11 ธันวาคม 2563",
        Sympton: "ผอมแห้ง มือสั่น",
        fT4: 47,
        TSH: 28.5,
        Solution: "ให้ยากลับไป"
      }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowuptreatmentresultPage');
  }

  EditTreatmentResult(){
    this.navCtrl.push(EdittreatmentresultPage);
  }
}
