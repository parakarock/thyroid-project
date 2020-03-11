import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatauserPage } from '../../AdminPage/datauser/datauser';
import {DatahosPage } from '../../AdminPage/datahos/datahos';
/**
 * Generated class for the AdminhomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adminhome',
  templateUrl: 'adminhome.html',
})
export class AdminhomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminhomePage');
  }

  user(){
    this.navCtrl.push(DatauserPage);
  }
  hos(){
    this.navCtrl.push(DatahosPage);
  }
}
