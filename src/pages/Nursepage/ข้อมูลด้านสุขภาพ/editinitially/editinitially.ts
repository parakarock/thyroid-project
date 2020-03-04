import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditinitiallyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editinitially',
  templateUrl: 'editinitially.html',
})
export class EditinitiallyPage {

  
  edgy:String;
  hot:String;
  ShakinHands:String;
  neck:String;
  Gland:String;
  BigEyes:String;
  Shit:String;
  specify:String;
  weight:String;
  period:String;
  disease:String;
  assign:String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditinitiallyPage');
  }

  do(){
    let body = JSON.stringify({
     
      edgy: this.edgy,
      hot: this.hot,
      ShakinHands: this.ShakinHands,
      neck: this.neck,
      Gland: this.Gland,
      BigEyes: this.BigEyes,
      Shit: this.Shit,
      specify: this.specify,
      weight: this.weight,
      period: this.period,
      disease: this.disease,
      assignl: this.assign
     
     
    });
  }
}
