import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdddatauserPage } from "../adddatauser/adddatauser";
/**
 * Generated class for the DpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dp',
  templateUrl: 'dp.html',
})
export class DpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DpPage');
  }

  adddatauser(){
   this.navCtrl.push(AdddatauserPage)
    
  }
}
