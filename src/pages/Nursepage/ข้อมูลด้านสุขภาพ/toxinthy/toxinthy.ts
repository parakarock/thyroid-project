import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InsertPage } from '../../insert/insert';

/**
 * Generated class for the ToxinthyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-toxinthy',
  templateUrl: 'toxinthy.html',
})
export class ToxinthyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToxinthyPage');
  }

  insert(){
    this.navCtrl.push(InsertPage)
  }

}
