import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DpPage } from '../../AdminPage/dp/dp';

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
    this.navCtrl.push(DpPage,{search : "หมอ",title: "ผู้ใช้ที่มีสถานะเป็นหมอ"});
  }
  dp(){
    this.navCtrl.push(DpPage,{search : "ผู้ป่วย",
  title: "ผู้ใช้ที่มีสถานะเป็นคนไข้"});
  }
  dn(){
    this.navCtrl.push(DpPage,{search : "พยาบาล",title: "ผู้ใช้ที่มีสถานะเป็นพยาบาล"});
  }
}
