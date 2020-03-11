import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditdataswallowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editdataswallow',
  templateUrl: 'editdataswallow.html',
})
export class EditdataswallowPage {
  eat:String;
  time:String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditdataswallowPage');
  }
  do(){
    let body = JSON.stringify({
     
      eat: this.eat,
      time: this.time 
     
    });
  }
}
