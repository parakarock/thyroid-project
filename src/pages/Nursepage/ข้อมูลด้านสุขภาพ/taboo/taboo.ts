import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditTabooPage } from '../edit-taboo/edit-taboo';
import {
  Http,
  Response,
  Headers,
  ResponseOptions,
  RequestOptions
} from "@angular/http";
import { GlobalProvider } from "../../../../providers/global/global";

/**
 * Generated class for the TabooPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-taboo',
  templateUrl: 'taboo.html',
})
export class TabooPage {
  showData: boolean = true;
  showFormSex : boolean;
  showNeckSurgery: boolean;
  showIrradiate: boolean;
  showCorrection: boolean;
  showchild: boolean;
  showAmblyopia: boolean;
  showdifficult: boolean;
  showrecommend: boolean;
  showInjection: boolean;
  showButtonedit: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalProvider, private http: Http) {
    this.showFormSex = this.checkSex(this.global.getSex())
    this.showButtonedit = this.checkRole(this.global.getSelectRole());
  }

  async ionViewWillEnter() {
    console.log("ionViewWillEnter InitiallyPage");
    await this.navCtrl.getActive().component
    this.showData = false;
  }
 async ionViewDidEnter(){
    console.log("ionViewDidEnter InitiallyPage");
    await this.getdata()
  }

  async getdata(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({ idcard: this.global.getpatientID(), round: this.global.getSelectRound() });
    console.log("body : " + body);
   await this.http
      .post(
        "http://192.168.43.140:8000/healthdata.php?method=get_mineral_therapy&role=nurse",
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if ( data.therapy_1) {
            this.showData = true;
            console.log("therapy_1 : "+  data.therapy_1);
            console.log("therapy_2 : "+  data.therapy_2);
            console.log("therapy_3 : "+  data.therapy_3);
            console.log("therapy_4 : "+  data.therapy_4);
            console.log("therapy_5 : "+  data.therapy_5);
            
            this.showNeckSurgery = data.therapy_1;
            this.showIrradiate = data.therapy_2;
            this.showCorrection = data.therapy_3;
            this.showchild = data.therapy_4;
            this.showAmblyopia = data.therapy_5;
            this.showdifficult = data.therapy_6;
            this.showrecommend = data.therapy_7;
            this.showInjection = data.therapy_8;
          } else {
            this.showData = false;
            console.log("data : " + this.showData);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  edittaboo(){
    this.navCtrl.push(EditTabooPage, {
      NeckSurgery : this.showNeckSurgery,
      Irradiate :this.showIrradiate,
      Correction : this.showCorrection,
      child : this.showchild,
      Amblyopia : this.showAmblyopia,
      difficult : this.showdifficult,
      recommend : this.showrecommend,
      Injection : this.showInjection,
      FormSex : this.showFormSex
    })
  }
  checkSex(sex){
    if(sex === "หญิง"){
      return true;
    }else{
      return false;
    }
  }
  checkRole(role){
    if(role === "nurse"){
      return true;
    }else{
      return false;
    }
  }
}
