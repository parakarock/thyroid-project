import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ChangepassLogin2Page } from "../changepass-login2/changepass-login2"
import { GlobalProvider } from "../../providers/global/global";
import {
  Http,
  Headers,
  RequestOptions
} from "@angular/http";
import moment from "moment";
import "moment/locale/TH";


/**
 * Generated class for the ChangepassLogin1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepass-login1',
  templateUrl: 'changepass-login1.html',
})
export class ChangepassLogin1Page {
  idcard;
  birthday;
  startMin: any;
  startMax: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: Http,public alertCtrl: AlertController,public global: GlobalProvider) {
    this.startMin = moment().add(443, 'y').format("YYYY");
    this.startMax = moment().add(543, 'y').format("YYYY");
    this.birthday = moment().add(543, 'y').format()
  }

  out(){
    alert("sdsd")
  }

  async pass1(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = { person_id: this.idcard, birthdate: moment(this.birthday).format("YYYY-MM-DD") };
    console.log("body : " + JSON.stringify(body));
    await this.http
      .post(
        "http://"+this.global.getIP()+"/login.php?method=changePassLogin1&role=guest",
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if(data.result === "Ok"){
            this.navCtrl.push(ChangepassLogin2Page,{ person_id: this.idcard });
          }else{
            this.presentAlert(data.result,"กรุณากรอกใหม่อีกครั้ง")
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  async presentAlert(title:string,txt: string) {
    let alert = await this.alertCtrl.create({
      title: title,
      subTitle: txt,
      buttons: ['Ok']
    });
    alert.present();
  }

}
