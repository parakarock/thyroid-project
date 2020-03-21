import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams,MenuController } from "ionic-angular";
import { HealthdatahomePage } from "../Nursepage/ข้อมูลด้านสุขภาพ/healthdatahome/healthdatahome";
import { PreparehomePage } from "../Nursepage/ขั้นตอนการเตรียมตัว/preparehome/preparehome";
import { TestresultPage } from "../Doctorpage/ผลการตรวจ/testresult/testresult";
import { LabtestresultPage } from "../Nursepage/ผลการตรวจทางห้องแลป/labtestresult/labtestresult";
import { GlobalProvider } from "../../providers/global/global";
import {
  BarcodeScanner,
  BarcodeScannerOptions
} from "@ionic-native/barcode-scanner";
import {
  Http,
  Response,
  Headers,
  ResponseOptions,
  RequestOptions
} from "@angular/http";

@IonicPage()
@Component({
  selector: "page-qrscan",
  templateUrl: "qrscan.html"
})
export class QrcodePage {
  code: string;
  to: string;
  data:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public global: GlobalProvider,
    private http: Http
  ) {
    this.to = navParams.get("page");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad QrcodePage");
  }

  async nextpage() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = { code: this.code };
    await this.http
      .post(
        "http://192.168.43.140:8000/qrcode.php?method=get_user&role=guest",
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          this.data = JSON.stringify(data);
          this.global.round = data;
          this.global.patientID = data[0].person_id;
          console.log(data[0]);

          if (this.to === "HealthdatahomePage") {
            // this.menu.enable(false);
            // this.navCtrl.setRoot(HealthdatahomePage);
            this.global.startTimer();
            this.navCtrl.push(HealthdatahomePage);
          }
          if (this.to === "PreparehomePage") {
            // this.menu.enable(false);
            // this.navCtrl.setRoot(PreparehomePage);
            this.navCtrl.push(PreparehomePage);
          }
          if (this.to === "LabtestresultPage") {
            // this.menu.enable(false);
            // this.navCtrl.setRoot(LabtestresultPage);
            this.navCtrl.push(LabtestresultPage);
          }
        },
        error => {
          console.log(error);
          alert(error);
        }
      );
   
  }
}
