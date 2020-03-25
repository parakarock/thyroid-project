import { GlobalProvider } from './../../../../providers/global/global';
import { ResponseOptions } from '@angular/http';
import { RequestOptions, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditinitiallyPage } from '../editinitially/editinitially';
import { Http } from '@angular/http';
/**
 * Generated class for the InitiallyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-initially',
  templateUrl: 'initially.html',
})
export class InitiallyPage {
  data:any;
  edgy: boolean;
  hot: boolean;
  shakinHands: boolean;
  neck: boolean;
  gland: boolean;
  bigeyes: boolean;
  shit: boolean;
  specify: boolean;
  weight: boolean;
  period: boolean;
  disease: boolean;
  assign: boolean;
  eat_a_lot: boolean;
  fast_heartrate: boolean;
  goitor: boolean;
  thyroid_lump: boolean;
  bulging_eye: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public global: GlobalProvider,
              private http: Http) {

    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = { idcard: this.global.patientID, round: this.global.round };
    console.log("body : " + body);
    this.http.post(
      "http://10.80.34.218:8000/healthdata.php?method=get_init-phase&role=nurse",
      body,
      options
    )
    .map(res => res.json())
    .subscribe(
      data => {
        this.data = JSON.stringify(data);
        this.edgy = data.frustration;
        this.eat_a_lot = data.eat_a_lot;
        this.hot = data.feel_hot;
        this.fast_heartrate = data.fast_heartbeat;
        this.shakinHands = data.shaking_hand;
        this.goitor = data.goitor;
        this.thyroid_lump = data.thyroid_lump;
        this.bulging_eye = data.bulging_eye;
        this.shit = data.digest_3;
        this.weight = data.lose_weight;
        this.period = data.few_period;
        this.disease = data.disease_name;
      },
      err => {
        console.log(err);
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitiallyPage');
  }

  editinitially(){
    this.navCtrl.push(EditinitiallyPage)
  }
}
