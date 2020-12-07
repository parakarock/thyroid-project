import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import {DatauserPage } from '../../AdminPage/datauser/datauser';
import {DatahosPage } from '../../AdminPage/datahos/datahos';
import { DatacontactPage } from '../../AdminPage/datacontact/datacontact';
import { HomePage } from "../../Homepage/home/home";
import { ChangepassPage } from "../../changepass/changepass";
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events,) {
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
  contact(){
    console.log("zdfsdfsdfsd")
    this.navCtrl.push(DatacontactPage);
  }
  onClickLogoutButton(){
    this.events.publish("user:guest");
    this.navCtrl.setRoot(HomePage);
  }
  ChangePass() {
    this.navCtrl.push(ChangepassPage);
  }
}
