import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdddatauserPage } from "../adddatauser/adddatauser";
/**
 * Generated class for the DdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dd',
  templateUrl: 'dd.html',
})
export class DdPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DdPage');
  }

  adddatauser(){
    this.navCtrl.push(AdddatauserPage)
     
   }
   
}
