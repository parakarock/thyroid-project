import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShowlabtestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showlabtest',
  templateUrl: 'showlabtest.html',
})
export class ShowlabtestPage {
  showBlockPill = true
  showAntiPill = true


  date = this.navParams.get("lab_date")
  hos_name = this.navParams.get("Lab_test_hosp")
  SerumT3 = this.navParams.get("free_T3")
  SerumT3st = this.navParams.get("free_T3_stan")
  SerumT4 = this.navParams.get("free_T4")
  SerumT4st = this.navParams.get("free_T4_stan")
  SerumTSH = this.navParams.get("TSH")
  SerumTSHst = this.navParams.get("TSH_stan")
  SerumTRAb = this.navParams.get("TRAb")
  SerumTRAbst = this.navParams.get("TRAb_stan")
  ThyroidMed = this.navParams.get("anti_thy_name")
  ThyroidMedVol = this.navParams.get("anit_thyroid_amount")
  ThyroidMedRoundPerDay = this.navParams.get("anit_thyroid_daily")
  BetaBlock = this.navParams.get("beta_thy_name")
  BetaBlockVol = this.navParams.get("beta_block_amount")
  BetaBlockRoundPerDay = this.navParams.get("beta_block_daily")
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowlabtestPage');
    if(this.ThyroidMed === "ไม่ต้องรับประทาน"){
      this.showAntiPill = false
    }
    if(this.BetaBlock === "ไม่ต้องรับประทาน"){
      this.showBlockPill = false
    }
  }

}
