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
import {
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import "moment/locale/TH";

/**
 * Generated class for the EditcontraceptivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-editcontraceptive",
  templateUrl: "editcontraceptive.html",
})
export class EditcontraceptivePage {
  control_name = this.navParams.get("control_name") || "ไม่ได้คุม";
  control_amount = this.navParams.get("control_amount");
  control_daily = this.navParams.get("control_daily")||"เดือน";

  last_peroid_date = moment(this.navParams.get("last_peroid_date")).format("YYYY-MM-DD")||moment().add(543, 'y').format()
  last_peroid_amount;

  showControl: boolean = this.navParams.get("showControl");
  startMin: any;
  startMax: any;
  formgroup: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public global: GlobalProvider,
    public http: Http,
    public alertCtrl: AlertController
  ) {
    this.startMin = moment().add(443, "y").format("YYYY");
    this.startMax = moment().add(543, "y").format("YYYY");

    this.formgroup = formBuilder.group({
      last_peroid_amount: [
        navParams.get("last_peroid_amount"),
        Validators.required,
      ],
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EditcontraceptivePage");

  }

  isControl(txt) {
    if (txt == "ไม่ได้คุม") {
      this.showControl = false;
      this.control_amount = null;
      this.control_daily = null;
    } else {
      this.showControl = true;
      this.control_amount = null;
      this.control_daily = "เดือน";
    }
  }

  update() {
    if (this.showControl == true && !this.control_amount) {
      this.presentAlert("กรุณาระบุจำนวน การคุมกำเนิด");
    } else {
      let body = JSON.stringify({
        idcard: this.global.getpatientID(),
        round: this.global.getSelectRound(),
        birth_control_name: this.control_name,
        birth_control_state: this.control_amount,
        birth_control_time: this.control_daily,

        last_period: moment(this.last_peroid_date).format("YYYY-MM-DD")
        ,
        last_period_amount: this.formgroup.controls.last_peroid_amount.value,
      });
      console.log(body);

      let headers = new Headers({ "Content-type": "application/json" });
      let options = new RequestOptions({ headers: headers });
      this.http
        .post(
          "https://" +
            this.global.getIP() +
            "/preparephase.php?method=update_period&role=" +
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
