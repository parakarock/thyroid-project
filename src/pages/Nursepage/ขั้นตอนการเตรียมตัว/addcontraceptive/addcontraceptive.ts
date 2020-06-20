import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { GlobalProvider } from "../../../../providers/global/global";
import { Http, Headers, RequestOptions } from "@angular/http";
import moment from "moment";
import "moment/locale/TH";

@IonicPage()
@Component({
  selector: "page-addcontraceptive",
  templateUrl: "addcontraceptive.html",
})
export class AddcontraceptivePage {
  UPT_date = this.navParams.get("UPT_date") || moment().add(543, "y").format();
  UPT_result = this.navParams.get("UPT_result") || "negative";
  startMin: any;
  startMax: any;
  button;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider,
    public http: Http,
    public alertCtrl: AlertController
  ) {
    this.startMin = moment().add(443, "y").format("YYYY");
    this.startMax = moment().add(543, "y").format("YYYY");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddcontraceptivePage");
    if(this.navParams.get('data')){
      this.button = "เพิ่ม"
    }else{
      this.button = "อัพเดท"
    }
  }

  update() {
    let body = JSON.stringify({
      idUPT_detail: this.navParams.get('idUPT_detail'),
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound(),
      UPT_result: this.UPT_result,
      UPT_date: moment(this.UPT_date).format("YYYY-MM-DD"),
    });
    console.log(body);

    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let status
    if(this.button == "อัพเดท"){
      status = "update_UTP"
    }else{
      status = "insert_UTP"
    }
    console.log(status)
    this.http
      .post(
        "http://" +
          this.global.getIP() +
          "/preparephase.php?method="+status+"&role=" +
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
}
