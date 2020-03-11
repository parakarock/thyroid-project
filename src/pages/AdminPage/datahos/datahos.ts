import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddhosPage } from '../../AdminPage/addhos/addhos';
/**
 * Generated class for the DatahosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datahos',
  templateUrl: 'datahos.html',
})
export class DatahosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatahosPage');
  }
  addhos(){
    this.navCtrl.push(AddhosPage);
  }
}
