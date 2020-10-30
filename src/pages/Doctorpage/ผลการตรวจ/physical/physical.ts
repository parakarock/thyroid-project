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
  sweat: any;
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
  body1_data:any;
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
    console.log('ionViewDidLoad PhysicalPage');
    this.getData();
  }

  ionViewWillEnter(){
    // if(this.navParams.get("formData")){
    //   return new Promise((resolve, reject) => {
    //       this.showData = true;
    //       this.check_date = this.navParams.get("formData").check_date;
    //       this.sweat = this.navParams.get("formData").sweat;
    //       this.hair_loss = this.navParams.get("formData").hair_loss;
    //       this.body_weight = this.navParams.get("formData").body_weight;
    //       this.heart_rate = this.navParams.get("formData").heart_rate;
    //       this.blood_pressure_upper = this.navParams.get("formData").blood_pressure_upper;
    //       this.blood_pressure_lower = this.navParams.get("formData").blood_pressure_lower;
    //       this.eye_detect = this.navParams.get("formData").eye_detect;
    //       this.eye_result = this.navParams.get("formData").eye_result;
    //       this.doctor_name = this.navParams.get("formData").doctor_name;
    //       this.doctor_date = this.navParams.get("formData").doctor_date;
    //       this.doctor_file = "http://" + this.global.getIP() + "/" +  this.navParams.get("formData").doctor_file;
    //       this.doctor_result= this.navParams.get("formData").doctor_result;
    //       this.treatment = this.navParams.get("formData").treatment;
    //     }
    //   );
    // }
  }

  physicals(){
    this.navCtrl.push(PhysicalsPage);
  }

  async getData(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound()
    });
    console.log("body : " + body);
    await this.http.post(
        "http://" + this.global.getIP() + "/result.php?method=get_bodyresult1&role=" + this.global.getSelectRole(),
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
            this.showData = true;
            this.check_date = moment(data.check_date,"YYYY-MM-DD").format("Do MMMM YYYY");
            this.sweat = data.sweat;
            this.hair_loss = data.hair_loss;
            this.body_weight = data.body_weight;
            this.heart_rate = data.heart_rate;
            this.blood_pressure_upper = data.blood_pressure_upper;
            this.blood_pressure_lower = data.blood_pressure_lower;
            this.eye_detect = data.eye_detect;
            this.eye_result = data.eye_result;
            this.doctor_name = data.doctor_name;
            this.doctor_date = moment(data.doctor_date,"YYYY-MM-DD").format("Do MMMM YYYY");
            this.doctor_file = "http://" + this.global.getIP() + "/" +  data.doctor_file;
            this.doctor_result= data.doctor_result;
            this.treatment = data.treatment;
            // console.log(JSON.stringify(data));
        },
        error => {
          console.log(error);
        }
      );
  }

  editphysical(){
    this.navCtrl.push(EditphysicalPage,
      {
      check_date: this.check_date,
      sweat: this.sweat,
      hair_loss: this.hair_loss,
      body_weight: this.body_weight,
      heart_rate: this.heart_rate,
      blood_pressure_upper: this.blood_pressure_upper,
      blood_pressure_lower: this.blood_pressure_lower,
      eye_dedtect: this.eye_detect,
      eye_result: this.eye_result,
      doctor_name: this.doctor_name,
      doctor_date: this.doctor_date,
      doctor_file: this.doctor_file,
      doctor_result: this.doctor_result,
      treatment: this.treatment,
    }
    );
  }

}
