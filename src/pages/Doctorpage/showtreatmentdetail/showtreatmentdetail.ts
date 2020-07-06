import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShowtreatmentdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-showtreatmentdetail',
  templateUrl: 'showtreatmentdetail.html',
})
export class ShowtreatmentdetailPage {
  date = this.navParams.get('pa_fol_date')
  clinic = this.navParams.get('pa_fol_result')
  ft4 = this.navParams.get('fT4_result')
  tsh = this.navParams.get('TSH_result')
  antiname = this.navParams.get('pa_fol_anti')
  antiamount = this.navParams.get('pa_fol_anti_amount')
  antidaily = this.navParams.get('pa_fol_anti_daily')
  betaname = this.navParams.get('pa_fol_beta')
  betaamount = this.navParams.get('pa_fol_beta_amount')
  betadaily = this.navParams.get('pa_fol_beta_daily')

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowtreatmentdetailPage');
  }

}
