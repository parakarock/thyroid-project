import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DdPage } from '../../AdminPage/dd/dd';
import {DpPage } from '../../AdminPage/dp/dp';
import {DnPage } from '../../AdminPage/dn/dn';
/**
 * Generated class for the DatauserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datauser',
  templateUrl: 'datauser.html',
})
export class DatauserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatauserPage');
  }
  dd(){
    this.navCtrl.push(DdPage);
  }
  dp(){
    this.navCtrl.push(DpPage);
  }
  dn(){
    this.navCtrl.push(DnPage);
  }
}
