
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../../../providers/global/global';

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


  frustration:boolean;
  // hot:boolean;
  shaking_hand:boolean;
  // neck:boolean;
  // gland:boolean;
  // bigeyes:boolean;
  // shit:boolean;
  specify:boolean;
  // weight:boolean;
  // period:boolean;
  // disease:boolean;
  // assign:boolean;
  eat_a_lot: boolean;
  fast_heartbeat: boolean;
  feel_hot: boolean;
  goiter: boolean;
  thyroid_lump: boolean;
  bulging_eye: boolean;
  digest_3: boolean;
  lose_weight: boolean;
  weak_arm: boolean;
  few_period: boolean;
  disease_name: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public global: GlobalProvider, private http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditinitiallyPage');
  }

  do(){
    let body = JSON.stringify({
      frustration: this.frustration,
      eat_a_lot: this.eat_a_lot,
      feel_hot: this.feel_hot,
      fast_heartbeat: this.fast_heartbeat,
      shaking_hand: this.shaking_hand,
      goiter: this.goiter,
      thyroid_lump: this.thyroid_lump,
      bulging_eye: this.bulging_eye,
      digest_3: this.digest_3,
      lose_weight: this.lose_weight,
      weak_arm: this.weak_arm,
      few_period: this.few_period,
      disease_name: this.disease_name
    });
  }
}
