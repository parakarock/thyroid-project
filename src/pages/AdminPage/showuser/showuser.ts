import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams,AlertController } from "ionic-angular";
import { GlobalProvider } from "../../../providers/global/global";
import { Http, Headers, RequestOptions } from "@angular/http";
import moment from "moment";
import "moment/locale/TH";
/**
 * Generated class for the ShowuserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-showuser",
  templateUrl: "showuser.html",
})
export class ShowuserPage {
  header = this.navParams.get("header");

  title = this.navParams.get("title");
  name = this.navParams.get("firstname") + " "+this.navParams.get("lastname");
  birthdate = moment(this.navParams.get("birthdate")).format("DD MMMM YYYY");
  age = moment().diff(
    moment(this.navParams.get("birthdate")).subtract(543, "y"),
    "years"
  );
  idCard = this.navParams.get("person_id");
  sex = this.navParams.get("gender");
  National = this.navParams.get("nationality");
  status = this.navParams.get("status");
  tel = this.navParams.get("phone");

  doctor: boolean = false
  nurse: boolean = false
  patient: boolean = false
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider,
    private http: Http,
    public alertCtrl: AlertController,
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ShowuserPage");
    this.getRole()
  }

  getRole() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({ idcard: this.navParams.get("person_id") });
    console.log("body : " + body);
    this.http
      .post(
        "http://" +
          this.global.getIP() +
          "/admin.php?method=getrole_user&role=" +
          this.global.getSelectRole(),
        body,
        options
      )
      .map((res) => res.json())
      .subscribe(
        (data) => {
          console.log(data);
          if (data.result) {
            this.presentAlert(data.result);
          } else {
            if (
              data.findIndex((role_name) => role_name.role_name === "หมอ") >= 0
            ) {
              this.doctor = true;
            }
            if (
              data.findIndex((role_name) => role_name.role_name === "พยาบาล") >=
              0
            ) {
              this.nurse = true;
            }
            if (
              data.findIndex(
                (role_name) => role_name.role_name === "ผู้ป่วย"
              ) >= 0
            ) {
              this.patient = true;
            }
          }
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  }
  async presentAlert(txt: string) {
    let alert = await this.alertCtrl.create({
      title: "เกิดข้อผิดพลาด",
      subTitle: txt,
      buttons: ["Ok"],
    });
    alert.present();
  }
}
