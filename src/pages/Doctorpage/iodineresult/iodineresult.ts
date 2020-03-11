import { IodineresultdetailPage } from '../iodineresultdetail/iodineresultdetail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IodineresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-iodineresult',
  templateUrl: 'iodineresult.html',
})
export class IodineresultPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IodineresultPage');
  }

  onClickIodineDetail(){
    this.navCtrl.push(IodineresultdetailPage);
  }

}
