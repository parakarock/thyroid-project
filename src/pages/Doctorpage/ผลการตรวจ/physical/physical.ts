import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhysicalsPage } from '../physicals/physicals';
import { EditphysicalPage } from '../editphysical/editphysical';
import { GlobalProvider } from '../../../../providers/global/global';
import { RequestOptions } from '@angular/http';
import * as moment from "moment";
/**
 * Generated class for the PhysicalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-physical',
  templateUrl: 'physical.html',
})
export class PhysicalPage {
  showMenu: boolean;
  showData: boolean = true;
  check_date: string;
  sweat: string;
  hair_loss: any;
  body_weight: any;
  heart_rate: any;
  blood_pressure_upper: any;
  blood_pressure_lower: any;
  eye_detect: any;
  eye_result: any;
  doctor_name: any;
  doctor_date: any;
  doctor_file: any;
  doctor_result: any;
  treatment: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public global: GlobalProvider,
              public http: Http) {
    if(this.global.getSelectRole() === "doctor"){
      this.showMenu = true;
    }else{
      this.showMenu = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhysicalPage');
  }

  physicals(){
    this.navCtrl.push(PhysicalsPage);
  }
  editphysical(){
    this.navCtrl.push(EditphysicalPage);
  }

  async getData(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({ idcard: this.global.getpatientID(), round: this.global.getSelectRound() });
    console.log("body : " + body);
   await this.http
      .post(
        "http://192.168.31.98:8000/result.php?method=get_bodyresult1&role=doctor",
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if ( data[0].firstname !== null) {
            this.showData = true;
            console.log("data : " + this.showData);
            this.check_date = moment(data.check_date,"YYYY-MM-DD").format("Do MMMM YYYY");
            this.sweat = data.sweat;
            this.hair_loss = data.lastname;
            this.hair_loss = data.hair_loss;
            this.body_weight = data.body_weight;
            this.heart_rate = data.heart_rate;
            this.blood_pressure_upper = data.blood_pressure_upper;
            this.blood_pressure_lower = data.blood_pressure_lower;
            this.eye_detect = data.eye_detect;
            this.eye_result = data.eye_result;
            this.doctor_name = data.doctor_name;
            this.doctor_date = moment(data.doctor_date,"YYYY-MM-DD").format("Do MMMM YYYY");
            this.doctor_file = "http://" + this.global.getIP() + data.doctor_file;
            this.doctor_result= data.doctor_result;
            this.treatment = data.treatment;
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

}
