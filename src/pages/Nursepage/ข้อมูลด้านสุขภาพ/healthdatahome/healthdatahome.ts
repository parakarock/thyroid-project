import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeneralPage } from '../general/general';
import { InitiallyPage } from '../initially/initially';
import { RiskyPage } from '../risky/risky';
import { TabooPage } from '../taboo/taboo';
import { HistoryPage } from '../history/history';

/**
 * Generated class for the HealthdatahomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-healthdatahome',
  templateUrl: 'healthdatahome.html',
})
export class HealthdatahomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthdatahomePage');
  }
  general(){
    this.navCtrl.push(GeneralPage)
  }
  initially(){
    this.navCtrl.push(InitiallyPage)
  }
  risky(){
    this.navCtrl.push(RiskyPage)
  }
  taboo(){
    this.navCtrl.push(TabooPage)
  }
  history(){
    this.navCtrl.push(HistoryPage)
  }

}
