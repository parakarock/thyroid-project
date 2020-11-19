import { FollowuptreatmentresultPage } from '../followuptreatmentresult/followuptreatmentresult';
import { IodineresultPage } from '../iodineresult/iodineresult';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events,MenuController,AlertController } from 'ionic-angular';
import { HomePage } from '../../Homepage/home/home';
import {TestresultPage } from '../../Doctorpage/ผลการตรวจ/testresult/testresult';
import {HealthdatahomePage } from '../../Nursepage/ข้อมูลด้านสุขภาพ/healthdatahome/healthdatahome';
import {ChangepassPage } from '../../changepass/changepass';
import { NurseHomePage } from "../../Nursepage/nurse-home/nurse-home";
import { PatientHomePage } from "../../Patientpage/patient-home/patient-home";
import { GlobalProvider } from "../../../providers/global/global";
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import {
  Http,
  Headers,
  RequestOptions,
} from "@angular/http";
import "rxjs/add/operator/map";


@IonicPage()
@Component({
  selector: 'page-doctor-home',
  templateUrl: 'doctor-home.html',
})
export class DoctorHomePage {
  roles;
  rounds;
  name;
  status: string;
  showMenu: boolean;
  code:string;
  scannedData:any={};
  number;
  patientname;
  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events,public menu: MenuController,public global: GlobalProvider,private http: Http,
    public scanner: BarcodeScanner,public alertCtrl: AlertController,) {

  }
  options: BarcodeScannerOptions;
  selectRole() {
    if (this.status === "พยาบาล") {
      this.events.publish("user:nurse");
      this.menu.enable(false);
      this.navCtrl.setRoot(NurseHomePage);
    }
    if (this.status === "ผู้ป่วย") {
      this.logoutPatient()
      this.global.setpatientID(this.global.getLoginID())
      this.global.setSex(this.global.getSexLogin())
      this.events.publish("user:patient");
      this.menu.enable(false);
      this.navCtrl.setRoot(PatientHomePage);
    }
  }
  SelectRound(){
    this.global.setSelectRound(this.number)
    console.log(this.global.getSelectRound())
  }
  scan(){
    this.scanner.scan(this.options).then((data) => {
      console.log(data);
      this.code = data.text;
      this.loginPatient()
      },(err)=> {
        console.log('Error :',err);
      })
    }
  ionViewDidLoad() {
    console.log("ionViewDidLoad NurseHomePage");
    this.roles = this.global.getrole();
    this.name = this.global.getname();
    this.showMenu = this.global.getShowMenuMain();
  }
  ionViewWillEnter(){
    this.showMenu = this.global.getShowMenuMain();
    this.rounds = this.global.getRound();
    this.patientname = this.global.getpatientName()
  }
  healthdatahome(){
    this.navCtrl.push(HealthdatahomePage);
  }

  testresult(){
    this.navCtrl.push(TestresultPage);
  }
  navigateIodineResult(){
    this.navCtrl.push(IodineresultPage);
  }

  navigateFollowUpResult(){
    this.navCtrl.push(FollowuptreatmentresultPage);
  }
  onClickLogoutButton(){
    this.global.setShowMenuMain(false)
    this.events.publish('user:guest');
    this.navCtrl.setRoot(HomePage);
  }

  ChangePass(){
    this.navCtrl.push(ChangepassPage);
  }
  logoutPatient(){
    this.global.setShowMenuMain(false)
    this.showMenu = this.global.getShowMenuMain();
  }

  async loginPatient() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = { code: this.code };
    console.log(body)
    await this.http
      .post(
        "http://"+this.global.getIP()+"/qrcode.php?method=get_patient&role="+this.global.getSelectRole(),
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if (data.result) {
            this.presentAlert(data.result);
          } else {
            this.global.setRound(data[1]);
            this.global.setpatientID(data[0].person_id);
            this.global.setpatientName(data[0].fullname);
            this.global.setSex(data[0].gender);
            this.global.setShowMenuMain(true);
            console.log(this.global.getRound())
            this.rounds = this.global.getRound();
            this.patientname = this.global.getpatientName()
            this.showMenu = this.global.getShowMenuMain();
          }
        },
        error => {
          console.log(error);
        }
      );
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
