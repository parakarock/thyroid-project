import * as moment from "moment";
import { Headers, RequestOptions, Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditphysicalsPage } from '../editphysicals/editphysicals';
import { GlobalProvider } from '../../../../providers/global/global';

/**
 * Generated class for the PhysicalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-physicals',
  templateUrl: 'physicals.html',
})
export class PhysicalsPage {
  showMenu: boolean;
  showData: boolean = true;
  thyroid_size: any;
  thyroid_tumor_detect: any;
  thyroid_tumor_size: any;
  heart_lung_unusual: any;
  heart_lung_detail: any;
  trembling_hand: any;
  power_left_hand:any;
  power_right_hand: any;
  power_left_leg: any;
  power_right_leg: any;
  swell_shin: any;
  brittle_nail: any;
  detail: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public global: GlobalProvider,
              public http: Http) {
    if(this.global.getSelectRole() === "หมอ"){
      this.showMenu = true;
    }else{
      this.showMenu = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhysicalsPage');
  }

  editphysicals(){
    this.navCtrl.push(EditphysicalsPage, {
      thyroid_size: this.thyroid_size,
      thyroid_tumor_detect: this.thyroid_tumor_detect,
      thyroid_tumor_size: this.thyroid_tumor_size,
      heart_lung_unusual: this.heart_lung_unusual,
      heart_lung_detail: this.heart_lung_detail,
      trembling_hand: this.trembling_hand,
      power_left_hand: this.power_left_hand,
      power_right_hand: this.power_right_hand,
      power_left_leg: this.power_left_leg,
      power_right_leg: this.power_right_leg,
      swell_shin: this.swell_shin,
      brittle_nail: this.brittle_nail,
      detail: this.detail,
    });
  }

  async getData(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({ idcard: this.global.getpatientID(), round: this.global.getSelectRound() });
    console.log("body : " + body);
   await this.http
      .post(
        "http://192.168.31.98:8000/result.php?method=get_bodyresult2&role=หมอ",
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          this.showData = true;
          this.thyroid_size = data.thyroid_size;
          this.thyroid_tumor_detect = data.thyroid_tumor_detect;
          this.thyroid_tumor_size = data.thyroid_tumor_size;
          this.heart_lung_unusual = data.heart_lung_unusual;
          this.heart_lung_detail = data.heart_lung_detail;
          this.trembling_hand = data.trembling_hand;
          this.power_left_hand = data.power_left_hand;
          this.power_right_hand = data.power_right_hand;
          this.power_left_leg = data.power_left_hleg
          this.power_right_leg = data.power_right_leg;
          this.swell_shin = data.swell_shin;
          this.brittle_nail = data.brittle_nail;
          this.detail = data.detail;
          console.log(JSON.stringify(data));
        },
        error => {
          console.log(error);
        }
      );

  }


}
