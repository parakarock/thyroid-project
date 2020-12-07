import { GenPage } from '../../gen/gen';
import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Slides,MenuController, AlertController } from "ionic-angular";
import { Events } from "ionic-angular";
import { HealthdatahomePage } from "../../Nursepage/ข้อมูลด้านสุขภาพ/healthdatahome/healthdatahome";
import { TestresultPage } from "../../Doctorpage/ผลการตรวจ/testresult/testresult";
import { PreparehomePage } from "../../Nursepage/ขั้นตอนการเตรียมตัว/preparehome/preparehome";
import { IodineresultPage } from "../../Doctorpage/iodineresult/iodineresult";
import { FollowuptreatmentresultPage } from "../../Doctorpage/followuptreatmentresult/followuptreatmentresult";
import { HomePage } from "../../Homepage/home/home";
import { ChangepassPage } from "../../changepass/changepass";
import { DoctorHomePage } from "../../Doctorpage/doctor-home/doctor-home";
import { NurseHomePage } from "../../Nursepage/nurse-home/nurse-home";
import { GlobalProvider } from "../../../providers/global/global";
import {
  Http,
  Headers,
  RequestOptions,
} from "@angular/http";
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: "page-patient-home",
  templateUrl: "patient-home.html"
})
export class PatientHomePage {
  roles;
  name;
  rounds;
  number
  status: string;

  options: BarcodeScannerOptions;
  encodeData:any={};
  scannedData:any={};
  @ViewChild(Slides) slides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public menu: MenuController,
    public global: GlobalProvider,
    private http: Http,
    public alertCtrl: AlertController,
    public scanner: BarcodeScanner
  ) {

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PatientHomePage");
    this.getRound()
    this.roles = this.global.getrole();
    this.name = this.global.getname();
  }

  selectRole() {
    if (this.status === "พยาบาล") {
      this.events.publish("user:nurse");
      this.menu.enable(false);
      this.navCtrl.setRoot(NurseHomePage);
    }
    if (this.status === "หมอ") {
      this.events.publish("user:doctor");
      this.menu.enable(false);
      this.navCtrl.setRoot(DoctorHomePage);
    }
  }
  SelectRound(){
    this.global.setSelectRound(this.number)
    console.log(this.global.getSelectRound())
  }

  getRound(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = { person_id: this.global.getpatientID() };
    console.log(body)
     this.http
      .post(
        "https://"+this.global.getIP()+"/login.php?method=getRounds&role="+this.global.getSelectRole(),
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if (data.result) {
            this.presentAlert(data.result);
          } else {
            this.global.setRound(data);
            this.rounds = this.global.getRound();

          }
        },
        error => {
          console.log(error);
        }
      );
  }
  generateQR(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = { idcard: this.global.getpatientID() };
    console.log(body)
     this.http
      .post(
        "https://"+this.global.getIP()+"/qrcode.php?method=genarate_QRcode&role="+this.global.getSelectRole(),
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if (data.code) {
            this.encode(data.code);
          } else {
            this.presentAlert(data.result)
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  encode(encodText){
    this.scanner.encode(this.scanner.Encode.TEXT_TYPE, encodText).then((data) => {
      this.encodeData = data;
    },(err)=> {
      this.presentAlertQR("รหัสQRcode : "+encodText)
      console.log('Error :',err);
    })

  }
  async presentAlert(txt: string) {
    let alert = await this.alertCtrl.create({
      title: "แจ้งเตือน",
      subTitle: txt,
      buttons: ["Ok"]
    });
    alert.present();
  }
  async presentAlertQR(txt: string) {
    let alert = await this.alertCtrl.create({
      title: "QRcode",
      subTitle: txt,
      buttons: ["Ok"]
    });
    alert.present();
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log("Current index is", currentIndex);
  }

  healthdatahome() {
    this.navCtrl.push(HealthdatahomePage);
  }

  testresult() {
    this.navCtrl.push(TestresultPage);
  }

  Preparehome() {
    this.navCtrl.push(PreparehomePage);
  }
  Iodineresult() {
    this.navCtrl.push(IodineresultPage);
  }
  follow() {
    this.navCtrl.push(FollowuptreatmentresultPage);
  }
  onClickLogoutButton() {
    this.events.publish("user:guest");
    this.navCtrl.setRoot(HomePage);
  }
  ChangePass() {
    this.navCtrl.push(ChangepassPage);
  }

  genqrcode(){
    this.navCtrl.push(GenPage);
  }
}
