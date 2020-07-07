import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
  selector: 'page-edithistory',
  templateUrl: 'edithistory.html',
})
export class EdithistoryPage {
  formgroup: FormGroup;
  startMin: any;
  startMax: any;

  specify:boolean;
  data;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,public global: GlobalProvider,public alertCtrl: AlertController, private http: Http,) {
    this.startMin = moment().add(443, 'y').format("YYYY");
    this.startMax = moment().add(543, 'y').format("YYYY");
    
    this.specify = this.checkNull(navParams.get("specify"));

    this.formgroup = formBuilder.group({
      hospital: [
        navParams.get("hospital")||"",
        Validators.compose([
          
          Validators.pattern("^[ก-๏sa-zA-Z]+$")
        ])
     
      ],
      datemineral: [moment(navParams.get("datemineral"),"Do MMMM YYYY").format("YYYY-MM-DD")],
      amount: [
        navParams.get("amount")
      ]   
    });
    if(navParams.get("specify") == false){
      this.formgroup.controls.datemineral.setValue(moment().add(543, 'y').format()) 
    }
  }

  changespecify() {
    this.specify = !this.specify
    console.log(this.specify);
  }
  
  
  checkNull(data) {
    if (data === null) {
      return false;
    } else if (data === 0) {
      return false;
    } else if (data === 1) {
      return true;
    } else if (data === undefined){
      return false
    }
  }
  editData(data){
    if(data === true){
      return 1;
    }
    if(data === false){
      return 0;
    }
    if (data === null) {
      return 1;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EdithistoryPage');
  }
 checkTrue(value){
   if(this.specify){
     return value
   }
 }
  updateEdithistory() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = {
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound(),

      did: this.editData(this.specify),
      hospital: this.checkTrue(this.formgroup.controls.hospital.value) ,
      therapy_date: this.checkTrue(moment(this.formgroup.controls.datemineral.value).format("YYYY-MM-DD")) ,
      volume: this.checkTrue(this.formgroup.controls.amount.value)
    };
    this.data = body;
    this.navCtrl.getPrevious().data.formData = this.data
      this.http
        .post(
          "http://"+this.global.getIP()+"/healthdata.php?method=update_mineral_history&role="+this.global.getSelectRole(),
          body,
          options
        )
        .map(res => res.json())
        .subscribe(
          data => {
            if(data.result){
              this.presentAlert(data.result);
            }
          },
          error => {
            console.log(error);
          }
        );
  }
  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      title: "ยืนยันการอัพเดทข้อมูล",
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
            this.updateEdithistory();
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
  async presentAlert(txt: string) {
    let alert = await this.alertCtrl.create({
      title: "แจ้งเตือน",
      subTitle: txt,
      buttons: ["Ok"]
    });
    alert.present();
  }
}
