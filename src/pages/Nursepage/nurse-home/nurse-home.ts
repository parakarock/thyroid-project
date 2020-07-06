import { DoctorHomePage } from "../../Doctorpage/doctor-home/doctor-home";
import { LabtestresultPage } from "../../Nursepage/ผลการตรวจทางห้องแลป/labtestresult/labtestresult";
import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  ViewController,
  MenuController,
  AlertController
} from "ionic-angular";
import { RegisterPage } from "../register/register";
import { HomePage } from "../../Homepage/home/home";
import { HealthdatahomePage } from "../ข้อมูลด้านสุขภาพ/healthdatahome/healthdatahome";
import { PreparehomePage } from "../ขั้นตอนการเตรียมตัว/preparehome/preparehome";
import { TestresultPage } from "../../Doctorpage/ผลการตรวจ/testresult/testresult";
import { GlobalProvider } from "../../../providers/global/global";
import { QrcodePage } from "../../qrscan/qrscan";
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { PatientHomePage } from "../../Patientpage/patient-home/patient-home";
import {
  Http,
  Headers,
  RequestOptions,
} from "@angular/http";
import "rxjs/add/operator/map";
import { ChangepassPage } from "../../changepass/changepass";
/**
 * Generated class for the NurseHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-nurse-home",
  templateUrl: "nurse-home.html",
})
export class NurseHomePage {
 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public menu: MenuController,
    public global: GlobalProvider,
    private http: Http,
    public scanner: BarcodeScanner
  ) {}
  options: BarcodeScannerOptions;
  roles;
  rounds;
  name;
  status: string;
  showMenu: boolean;
  code:string;
  scannedData:any={};
  number;
  patientname;

  ionViewDidLoad() {
    console.log("ionViewDidLoad NurseHomePage");
    this.roles = this.global.getrole();
    this.name = this.global.getname();
    this.showMenu = this.global.getShowMenuMain();
  }
  ionViewWillEnter(){
    this.menu.enable(true)
    this.showMenu = this.global.getShowMenuMain();
    this.rounds = this.global.getRound();
    this.patientname = this.global.getpatientName()
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
  selectRole() {
    if (this.status === "ผู้ป่วย") {
      this.events.publish("user:patient");
      this.logoutPatient()
      this.global.setpatientID(this.global.getLoginID())
      this.global.setSex(this.global.getSexLogin())
      this.menu.enable(false);
      this.navCtrl.setRoot(PatientHomePage);
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

  onClickRegister() {
    this.navCtrl.push(RegisterPage);
  }
  onClickLogoutButton() {
    this.global.setShowMenuMain(false)
    this.events.publish("user:guest");
    this.navCtrl.setRoot(HomePage);
  }

  navigateToLabTest() {
    this.navCtrl.push(LabtestresultPage);
  }

  goDoctorPage() {
    this.navCtrl.push(DoctorHomePage);
  }

  ChangePass() {
    this.navCtrl.push(ChangepassPage);
  }

  onClickHealthdatahome() {
    this.navCtrl.push(HealthdatahomePage);
  }
  onClickPreparehome() {
    this.navCtrl.push(PreparehomePage);
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
