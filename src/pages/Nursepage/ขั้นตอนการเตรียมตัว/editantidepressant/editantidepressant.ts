import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { GlobalProvider } from "../../../../providers/global/global";
import { Http, Headers, RequestOptions } from "@angular/http";
import moment from "moment";
import "moment/locale/TH";

/**
 * Generated class for the EditantidepressantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editantidepressant',
  templateUrl: 'editantidepressant.html',
})
export class EditantidepressantPage {
  dateBefore;
  dateAfter;
  isControl;
  showData;

  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalProvider,public http: Http,public alertCtrl: AlertController) {
    this.dateBefore = moment(this.global.getdate(), "YYYY-MM-DD")
        .subtract(3, "days")
        .format("Do MMMM YYYY");
        if(this.navParams.get("method")==="วิธีการประมาณ"){
          this.dateAfter = moment(this.global.getdate(), "YYYY-MM-DD")
        .add(4, "days")
        .format("Do MMMM YYYY");
        }else{
          this.dateAfter = moment(this.global.getdate(), "YYYY-MM-DD")
          .add(5, "days")
          .format("Do MMMM YYYY");
        }
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditantidepressantPage');
    if(this.navParams.get('isControl')){
      this.isControl = this.navParams.get('isControl')
    }else{
      this.isControl = "ต้อง"
    }
    this.isShow(this.isControl)
  }

  isShow(txt){
    if(txt == "ต้อง"){
      this.showData = true
    }else{
      this.showData = false
    }
  }
  update() {
      let body = {
        idcard: this.global.getpatientID(),
        round: this.global.getSelectRound(),
        period_control: this.isControl,
        
      };
      this.navCtrl.getPrevious().data.formData = body
      let headers = new Headers({ "Content-type": "application/json" });
      let options = new RequestOptions({ headers: headers });
      this.http
        .post(
          "http://" +
            this.global.getIP() +
            "/preparephase.php?method=update_control&role=" +
            this.global.getSelectRole(),
          body,
          options
        )
        .map((res) => res.json())
        .subscribe(
          (data) => {
            this.presentAlert(data.result);
            if (data.result !== "Fail") {
              this.navCtrl.pop();
            }
          },
          (error) => {
            console.log(error);
          }
        );
    
  }
  async presentAlert(txt: string) {
    let alert = await this.alertCtrl.create({
      title: "การแจ้งเตือน",
      subTitle: txt,
      buttons: ["Ok"],
    });
    alert.present();
  }
  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      title: "ยืนยันการแก้ไขข้อมูล",
      message: "",
      buttons: [
        {
          text: "ยกเลิก",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "ยืนยัน",
          handler: () => {
            this.update();
          }
        }
      ]
    });
    alert.present();
  }
 
}
