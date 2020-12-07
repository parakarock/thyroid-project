import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContraceptivePage } from '../contraceptive/contraceptive';
import { AntidepressantPage } from '../antidepressant/antidepressant';
import { AvoideatingPage } from '../avoideating/avoideating';
import { PracticePage } from '../practice/practice';
import { DataswallowPage } from '../dataswallow/dataswallow';
import { EditdatePage } from '../editdate/editdate';
import { GlobalProvider } from "../../../../providers/global/global";
import {
  Http,
  Headers,
  RequestOptions
} from "@angular/http";
import moment from "moment";
import "moment/locale/TH";

@IonicPage()
@Component({
  selector: 'page-preparehome',
  templateUrl: 'preparehome.html',
})
export class PreparehomePage {
  showFormSex : boolean;
  showButtonedit: boolean;
  showPatient : boolean;
  showData: boolean = true;
  appoint_date;
  method;
  data;
  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalProvider, private http: Http) {
    this.showFormSex = this.checkSex(this.global.getSex())
    this.showButtonedit = this.checkRole(this.global.getSelectRole());
    this.showPatient = this.checkPatient()
    console.log(this.global.getSex()+this.showFormSex+"-"+this.showButtonedit+"-"+this.showPatient)
  }

  ionViewWillEnter() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = {
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound()
    };
      this.http
        .post(
          "https://"+this.global.getIP()+"/preparephase.php?method=get_preparephase&role="+this.global.getSelectRole(),
          body,
          options
        )
        .map(res => res.json())
        .subscribe(
          data => {
            if(data.result){
             console.log("error get data")
            }else{
              if(data.method){
                this.showData = true
                this.method = data.method
                if(data.method == "วิธีคำนวณ"){
                  this.appoint_date = "วันที่ " + moment(data.prep_date,"YYYY-MM-DD").format("Do MMMM YYYY") +" ถึง " + moment(data.prep_date,"YYYY-MM-DD").add('days', 1).format("Do MMMM YYYY")
                }else{
                  this.appoint_date = "วันที่ " + moment(data.prep_date,"YYYY-MM-DD").format("Do MMMM YYYY")
                }
                this.global.setdate(data.prep_date)
              }else{
                this.showData = false
              }
              this.data = data
            }
          },
          error => {
            console.log(error);
          }
        );
  }

  contraceptive(){
    this.navCtrl.push(ContraceptivePage,this.data)
  }
  antidepressant(){
    this.navCtrl.push(AntidepressantPage,{isControl:this.data.period_control,
    method:this.data.method})
  }
  avoideating(){
    this.navCtrl.push(AvoideatingPage,{
      method:this.method
    })
  }
  practice(){
    this.navCtrl.push(PracticePage)
  }
  dataswallow(){
    this.navCtrl.push(DataswallowPage)
  }
  editdate(){
    this.navCtrl.push(EditdatePage,{
      method:this.method
    })
  }
  checkSex(sex){
    if(sex === "หญิง"){
      return true;
    }else{
      return false;
    }
  }
  checkPatient(){
    if(this.global.getSelectRole() === "ผู้ป่วย"){
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
