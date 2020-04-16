import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditTabooPage } from '../edit-taboo/edit-taboo';
import {
  Http,
  Headers,
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

  async ionViewDidLoad() {
    this.showData = false;
    await this.getdata()
  }

  ionViewWillEnter(){
    if(this.navParams.get("formData")){ 
    return  new Promise((resolve, reject) => {
      this.showData = true; 
    this.showNeckSurgery = this.navParams.get("formData").therapy_1;
    this.showIrradiate = this.navParams.get("formData").therapy_2;
    this.showCorrection= this.navParams.get("formData").therapy_3;
    this.showchild= this.navParams.get("formData").therapy_4;
    this.showAmblyopia= this.navParams.get("formData").therapy_5;
    this.showdifficult= this.navParams.get("formData").therapy_6;
    this.showrecommend= this.navParams.get("formData").therapy_7;
    this.showInjection= this.navParams.get("formData").therapy_8;
        });
  
    }
  }

  async getdata(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({ idcard: this.global.getpatientID(), round: this.global.getSelectRound() });
    console.log("body : " + body);
   await this.http
      .post(
        "http://"+this.global.getIP()+"/healthdata.php?method=get_mineral_therapy&role="+this.global.getSelectRole(),
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if ( data.therapy_1 !== null) {
            this.showData = true;
            
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
    if(role === "พยาบาล"){
      return true;
    }else{
      return false;
    }
  }
}
