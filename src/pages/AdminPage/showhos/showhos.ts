import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShowhosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showhos',
  templateUrl: 'showhos.html',
})
export class ShowhosPage {
  hos_id = this.navParams.get("h_id")
  hos_name = this.navParams.get("hos_name")
  address = this.navParams.get("address")
  tel = this.navParams.get("phone")
  SerumT3st = this.navParams.get("freeT3_standard")
  SerumT4st = this.navParams.get("freeT4_standard")
  SerumTSHst = this.navParams.get("TSH_standard")
  SerumTRAbst = this.navParams.get("TRAb_standard")
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowhosPage');
  }

}
