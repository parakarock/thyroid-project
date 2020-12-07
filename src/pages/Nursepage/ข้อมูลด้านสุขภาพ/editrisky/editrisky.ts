import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {
  Http,
  Headers,
  RequestOptions
} from "@angular/http";
import { GlobalProvider } from "../../../../providers/global/global";

/**
 * Generated class for the EditriskyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editrisky',
  templateUrl: 'editrisky.html',
})
export class EditriskyPage {

  stress: boolean = this.checkNull(this.navParams.get("stress"));
  hard_work: boolean = this.checkNull(this.navParams.get("hard_work"));

  nightWork: boolean = this.navParams.get("nightWork");
  night_work_hour: number = this.navParams.get("night_work_hour");

  Overtime: boolean = this.navParams.get("Overtime");
  overtime_hour: number = this.navParams.get("overtime_hour");

  sleep_less_than_4: boolean = this.checkNull(this.navParams.get("sleep_less_than_4"));
  pregnant: boolean = this.checkNull(this.navParams.get("pregnant"));

  smoking: boolean = this.navParams.get("smoking");

  smoking_amount: number = this.navParams.get("smoking_amount");
  select_amount: boolean = this.selectChoice(this.navParams.get("select_amount"));

  smoking_time: number = this.navParams.get("smoking_time");
  select_time: boolean = this.selectChoice(this.navParams.get("select_time"));

  smoking_stop: number = this.navParams.get("smoking_stop");
  select_stop: boolean = this.selectChoice(this.navParams.get("select_stop"));

  no_risk_factor: boolean = this.checkNull(this.navParams.get("no_risk_factor"));
  relative_toxic_thyroid: boolean = this.checkNull(this.navParams.get("relative_toxic_thyroid"));

  showFormSex: boolean = this.navParams.get("showFormSex");
  showData : boolean = this.navParams.get("showData");
  data;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
    private http: Http,
    public global: GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditriskyPage');
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

  selectChoice(txt){
    if(txt === "มวนต่อวัน"||txt === "ปี"){
      return true
    }else{
      return false
    }
  }
  revertChoice1(txt:boolean){
    if(txt){
      return "มวนต่อวัน"
    }else{
      return "ซองต่อวัน"
    }
  }
  revertChoice2(txt:boolean){
    if(txt){
      return "ปี"
    }else{
      return "เดือน"
    }
  }


  changeStress() {
    this.stress = !this.stress;
    console.log(this.stress);
  }
  changeHard_work(){
    this.hard_work = !this.hard_work;
    console.log(this.hard_work);
  }
  changeNightWork(){
    this.nightWork = !this.nightWork;
    console.log(this.nightWork);
  }
  changeOvertime(){
    this.Overtime = !this.Overtime;
    console.log(this.Overtime);
  }
  changeSleep_less_than_4(){
    this.sleep_less_than_4 = !this.sleep_less_than_4;
    console.log(this.sleep_less_than_4);
  }
  changePregnant(){
    this.pregnant = !this.pregnant;
    console.log(this.pregnant);
  }
  changeSmoking(){
    this.smoking = !this.smoking;
    console.log(this.smoking);
  }
  changeSelect_amount(){
    this.select_amount = !this.select_amount;
    console.log(this.select_amount);
  }
  changeSelect_time(){
    this.select_time = !this.select_time;
    console.log(this.select_time);
  }
  changeSelect_stop(){
    this.select_stop = !this.select_stop;
    console.log(this.select_stop);
  }


  changeNo_risk_factor(){
    this.no_risk_factor = !this.no_risk_factor;
    console.log(this.no_risk_factor);
  }
  changeRelative_toxic_thyroid(){
    this.relative_toxic_thyroid = !this.relative_toxic_thyroid;
    console.log(this.relative_toxic_thyroid);
  }

  updateData(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = {
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound(),

      stress: this.editData(this.stress),
      hard_work: this.editData(this.hard_work),

      night_work_hour: this.beforeUpdate1(this.editData(this.nightWork),this.night_work_hour),

      overtime_hour: this.beforeUpdate1(this.editData(this.Overtime),this.overtime_hour),

      sleep_less_than_4: this.editData(this.sleep_less_than_4),
      pregnant: this.editData(this.pregnant),

      smoking_amount: this.beforeUpdate1(this.smoking,this.smoking_amount) || null,
      select_amount: this.beforeUpdate2(this.smoking,this.checkString(this.smoking_amount),this.revertChoice1(this.select_amount)),

      smoking_time: this.beforeUpdate1(this.smoking,this.smoking_time) || null,
      select_time: this.beforeUpdate2(this.smoking,this.checkString(this.smoking_time),this.revertChoice2(this.select_time)),

      smoking_stop: this.beforeUpdate1(this.smoking,this.smoking_stop) || null,
      select_stop: this.beforeUpdate2(this.smoking,this.checkString(this.smoking_stop),this.revertChoice2(this.select_stop)),

      no_risk_factor: this.editData(this.no_risk_factor),
      relative_toxic_thyroid: this.editData(this.relative_toxic_thyroid)

    }
    this.data = body;
    this.navCtrl.getPrevious().data.formData = this.data
    this.http
      .post(
        "https://"+this.global.getIP()+"/healthdata.php?method=update_sym-phase&role="+this.global.getSelectRole(),
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
            this.updateData();
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

  editData(data) {
    if (data) {
      return 1;
    } else if (!data) {
      return 0;
    }else{
      return data;
    }
  }
  beforeUpdate1(check:boolean,txt){
    if(check&&txt){
      return txt
    }else{
      return null
    }
  }
  beforeUpdate2(check1:boolean,check2:boolean,txt){
    if(check1&&check2&&txt){
      return txt
    }else{
      return null
    }
  }
  checkString(txt) {
    if (typeof txt === "number" && txt !== null ) {
      return true;
    } else {
      return false;
    }
  }


}
