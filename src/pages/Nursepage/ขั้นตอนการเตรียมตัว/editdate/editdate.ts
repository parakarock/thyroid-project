import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { GlobalProvider } from "../../../../providers/global/global";
import moment from 'moment';
import 'moment/locale/TH';
import {
  Http,
  Headers,
  RequestOptions
} from "@angular/http";


/**
 * Generated class for the EditdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editdate',
  templateUrl: 'editdate.html',
})
export class EditdatePage {
  method
  showDate:boolean = true;
  date1
  date2
  startMin: any;
  startMax: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalProvider,public http: Http,
    public alertCtrl: AlertController) {
    this.startMin = moment().add(443, 'y').format("YYYY");
    this.startMax = moment().add(643, 'y').format("YYYY");

  }
 
  ionViewDidLoad() {
    if(this.navParams.get("method")){
      this.method = this.navParams.get("method")
      this.date1 = this.global.getdate()
      console.log("in")
    }else{
      this.method = "วิธีคำนวณ"
      this.date1 = moment().add(543, 'y').format()
      console.log("out")
    }
    this.selectMethod(this.navParams.get("method"))
    
  }
  
  selectMethod(method){
    if(method == "วิธีการประมาณ"){
      this.showDate = false;
    }else{
      this.showDate = true;
      this.updateDate()
    }
    console.log(method+this.showDate)
  }
  updateDate(){
    this.date2 = moment(this.date1,"YYYY-MM-DD").add('days', 1).format("DD-MM-YYYY")
  }
  checkDate2(){
    if(this.showDate == true){
      return moment(this.date2,"DD-MM-YYYY").format("YYYY-MM-DD")
    }else{
      return  null
    }
  }
  update(){
    let body = JSON.stringify({
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound(),
      prep_date:this.date1,
      end_date: this.checkDate2(),
      method:this.method
      
  
   });
   console.log(body)

   let headers = new Headers({ "Content-type": "application/json" });
   let options = new RequestOptions({ headers: headers });
      this.http
        .post(
          "http://"+this.global.getIP()+"/preparephase.php?method=update_preparephase&role="+this.global.getSelectRole(),
          body,
          options
        )
        .map(res => res.json())
        .subscribe(
          data => {
            this.presentAlert(data.result)
            if(data.result !== "Fail"){
              this.navCtrl.pop();
            } 
          },
          error => {
            console.log(error);
          }
        );
  }
  async presentAlert(txt: string) {
    let alert = await this.alertCtrl.create({
      title: 'การแจ้งเตือน',
      subTitle: txt,
      buttons: ['Ok']
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
