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
      }
    );
  }

  async getData(){ //ดึงข้อมูลมาแสดง
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound()
    });
    console.log("body : " + body);
    await this.http.post(
        "https://" + this.global.getIP() + "/result.php?method=get_thyroidUltraMass&role=" + this.global.getSelectRole(),
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
            this.showData = true;
            this.Thy_ult_data = JSON.parse(JSON.stringify(data));
            console.log(this.Thy_ult_data);
        },
        error => {
          console.log(error);
        }
      );
  }

  async getImage(){ //ดึงรูปภาพ Thyroid Ultrasound และผลลัพธ์มาแสดง
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound()
    });
    console.log("body : " + body);
    await this.http.post(
        "https://" + this.global.getIP() + "/result.php?method=get_thyroidUltraPic&role=" + this.global.getSelectRole(),
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          this.showData = true;
          this.thyroid_image = "https://" + this.global.getIP() + "/" + data.thyroid_image;
          this.thy_ult_result = data.thy_ult_result;
          console.log(JSON.stringify(data));
        },
        error => {
          console.log(error);
        }
      );
  }



}
