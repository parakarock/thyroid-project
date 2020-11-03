import { ExaminationPage } from '../examination/examination';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../../../providers/global/global';
import { RequestOptions } from '@angular/http';
import * as moment from "moment";
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
/**
 * Generated class for the ShowExaminationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-examination',
  templateUrl: 'show-examination.html',
})
export class ShowExaminationPage {
  // thy_num: any;
  // thy_ult_date: any;
  // thy_ult_advice: any;
  // thy_ult_follow_num: any;
  // thy_ult_follow_unit: any;
  // thy_ult_fine_result: any;
  // thy_ult_surgury_desc: any;
  momentjs: any = moment;
  Thy_ult_data: any = '';
  thyroid_image: any;
  thy_ult_result: any;
  items: any
  showMenu: boolean;
  showData: boolean = true;


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

  async ionViewDidLoad() {
    console.log('ionViewDidLoad ShowExaminationPage');
    await this.getData();
    this.getImage();
  }

  examination(){
    this.navCtrl.push(ExaminationPage,{
      // thyroid_image: this.thyroid_image,
      // thy_ult_result: this.thy_ult_result,
      // Thy_ult_data: this.Thy_ult_data
      }
    );
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
        "http://" + this.global.getIP() + "/result.php?method=get_thyroidUltraMass&role=" + this.global.getSelectRole(),
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          // for(let i = 0; i <= data.length; i++){
            // this.thy_num = data.thy_num;
            // this.thy_ult_date = data.thy_ult_date;
            // this.thy_ult_advice = data.thy_ult_advice;
            // this.thy_ult_follow_num = data.thy_ult_follow_num;
            // this.thy_ult_follow_unit = data.thy_ult_follow_unit;
            // this.thy_ult_fine_result = data.thy_ult_fine_result;
            // this.thy_ult_surgury_desc = data.thy_ult_surgury_desc;
            this.showData = true;
            this.Thy_ult_data = JSON.parse(JSON.stringify(data));
            console.log(this.Thy_ult_data);
          // }
            // console.log(JSON.stringify(data[i]));
        },
        error => {
          console.log(error);
        }
      );
  }

  async getImage(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound()
    });
    console.log("body : " + body);
    await this.http.post(
        "http://" + this.global.getIP() + "/result.php?method=get_thyroidUltraPic&role=" + this.global.getSelectRole(),
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          this.showData = true;
          this.thyroid_image = "http://" + this.global.getIP() + "/" + data.thyroid_image;
          this.thy_ult_result = data.thy_ult_result;
          console.log(JSON.stringify(data));
        },
        error => {
          console.log(error);
        }
      );
  }



}
