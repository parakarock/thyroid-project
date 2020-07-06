import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EditriskyPage } from "../editrisky/editrisky";
import { Http, Headers, RequestOptions } from "@angular/http";
import { GlobalProvider } from "../../../../providers/global/global";

/**
 * Generated class for the RiskyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-risky",
  templateUrl: "risky.html",
})
export class RiskyPage {
  stress: boolean;
  hard_work: boolean;

  nightWork: boolean;
  night_work_hour: number;

  Overtime: boolean;
  overtime_hour: number;

  sleep_less_than_4: boolean;
  pregnant: boolean;

  smoking: boolean;
  amount: boolean;
  smoking_amount: number;
  select_amount: String;
  time: boolean;
  smoking_time: number;
  select_time: String;
  stop: boolean;
  smoking_stop: number;
  select_stop: String;

  no_risk_factor: boolean;
  relative_toxic_thyroid: boolean;

  showFormSex: boolean;
  showButtonedit: boolean;
  showData: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider,
    private http: Http
  ) {
    this.showFormSex = this.checkSex(this.global.getSex());
    this.showButtonedit = this.checkRole(this.global.getSelectRole());
  }

  async ionViewDidLoad() {
    this.showData = false;
    await this.getdata();
  }

  ionViewWillEnter() {
    if (this.navParams.get("formData")) {
      return new Promise((resolve, reject) => {
        if (
          this.navParams.get("formData").stress === 1 ||
          this.navParams.get("formData").hard_work ||
          this.checkStringNight(
            this.navParams.get("formData").night_work_hour
          ) === true ||
          this.checkStringOver(this.navParams.get("formData").overtime_hour) ===
            true ||
          this.navParams.get("formData").sleep_less_than_4 === 1 ||
          (this.navParams.get("formData").pregnant === 1 && this.showFormSex) ||
          this.checkStringSmoke(
            this.navParams.get("formData").smoking_amount,
            this.navParams.get("formData").select_amount,
            this.navParams.get("formData").smoking_time,
            this.navParams.get("formData").select_time,
            this.navParams.get("formData").smoking_stop,
            this.navParams.get("formData").select_stop
          ) === true ||
          this.navParams.get("formData").no_risk_factor === 1 ||
          this.navParams.get("formData").relative_toxic_thyroid === 1 
        ) {
          this.showData = true;
          this.stress = this.navParams.get("formData").stress;
          this.hard_work = this.navParams.get("formData").hard_work;

          this.nightWork = this.checkStringNight(
            this.navParams.get("formData").night_work_hour
          );

          this.Overtime = this.checkStringOver(
            this.navParams.get("formData").overtime_hour
          );

          this.sleep_less_than_4 = this.navParams.get(
            "formData"
          ).sleep_less_than_4;
          this.pregnant = this.navParams.get("formData").pregnant;

          this.smoking = this.checkStringSmoke(
            this.navParams.get("formData").smoking_amount,
            this.navParams.get("formData").select_amount,
            this.navParams.get("formData").smoking_time,
            this.navParams.get("formData").select_time,
            this.navParams.get("formData").smoking_stop,
            this.navParams.get("formData").select_stop
          );

          this.no_risk_factor = this.navParams.get("formData").no_risk_factor;
          this.relative_toxic_thyroid = this.navParams.get(
            "formData"
          ).relative_toxic_thyroid;
        } else {
          this.showData = false;
          this.stress = this.navParams.get("formData").stress;
          this.hard_work = this.navParams.get("formData").hard_work;

          this.nightWork = this.checkStringNight(
            this.navParams.get("formData").night_work_hour
          );

          this.Overtime = this.checkStringOver(
            this.navParams.get("formData").overtime_hour
          );

          this.sleep_less_than_4 = this.navParams.get(
            "formData"
          ).sleep_less_than_4;
          this.pregnant = this.navParams.get("formData").pregnant;

          this.smoking = this.checkStringSmoke(
            this.navParams.get("formData").smoking_amount,
            this.navParams.get("formData").select_amount,
            this.navParams.get("formData").smoking_time,
            this.navParams.get("formData").select_time,
            this.navParams.get("formData").smoking_stop,
            this.navParams.get("formData").select_stop
          );

          this.no_risk_factor = this.navParams.get("formData").no_risk_factor;
          this.relative_toxic_thyroid = this.navParams.get(
            "formData"
          ).relative_toxic_thyroid;
          
        }
      });
    }
  }

  async getdata() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound(),
    });

    await this.http
      .post(
        "http://" +
          this.global.getIP() +
          "/healthdata.php?method=get_sym-phase&role=" +
          this.global.getSelectRole(),
        body,
        options
      )
      .map((res) => res.json())
      .subscribe(
        (data) => {
          if (
            data.stress === 1 ||
            data.hard_work ||
            this.checkStringNight(data.night_work_hour) === true ||
            this.checkStringOver(data.overtime_hour) === true ||
            data.sleep_less_than_4 === 1 ||
            (data.pregnant === 1 && this.showFormSex) ||
            this.checkStringSmoke(
              data.smoking_amount,
              data.select_amount,
              data.smoking_time,
              data.select_time,
              data.smoking_stop,
              data.select_stop
            ) === true ||
            data.no_risk_factor === 1 ||
            data.relative_toxic_thyroid === 1 
          ) {
            this.showData = true;
            this.stress = data.stress;
            this.hard_work = data.hard_work;

            this.nightWork = this.checkStringNight(data.night_work_hour);

            this.Overtime = this.checkStringOver(data.overtime_hour);

            this.sleep_less_than_4 = data.sleep_less_than_4;
            this.pregnant = data.pregnant;

            this.smoking = this.checkStringSmoke(
              data.smoking_amount,
              data.select_amount,
              data.smoking_time,
              data.select_time,
              data.smoking_stop,
              data.select_stop
            );

            this.no_risk_factor = data.no_risk_factor;
            this.relative_toxic_thyroid = data.relative_toxic_thyroid;
         
          } else {
            this.showData = false;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  editrisky() {
    this.navCtrl.push(EditriskyPage, {
      stress: this.stress,
      hard_work: this.hard_work,

      nightWork: this.nightWork,
      night_work_hour: this.night_work_hour,

      Overtime: this.Overtime,
      overtime_hour: this.overtime_hour,

      sleep_less_than_4: this.sleep_less_than_4,
      pregnant: this.pregnant,

      smoking: this.smoking,
      amount: this.amount,
      smoking_amount: this.smoking_amount,
      select_amount: this.select_amount,
      time: this.time,
      smoking_time: this.smoking_time,
      select_time: this.select_time,
      stop: this.stop,
      smoking_stop: this.smoking_stop,
      select_stop: this.select_stop,

      no_risk_factor: this.no_risk_factor,
      relative_toxic_thyroid: this.relative_toxic_thyroid,
     
      showFormSex: this.showFormSex,
      showData: this.showData,
    });
  }
  checkSex(sex) {
    if (sex === "หญิง") {
      return true;
    } else {
      return false;
    }
  }
  checkRole(role) {
    if (role === "พยาบาล") {
      return true;
    } else {
      return false;
    }
  }
  checkStringNight(txt) {
    if (typeof txt === "number" && txt !== null) {
      this.night_work_hour = txt;
      return true;
    } else {
      return false;
    }
  }
  checkStringOver(txt) {
    if (typeof txt === "number" && txt !== null) {
      this.overtime_hour = txt;
      return true;
    } else {
      return false;
    }
  }
  checkStringSmoke(txt1, txt2, txt3, txt4, txt5, txt6) {
    if (
      (typeof txt1 === "number" && txt1 !== null) ||
      (typeof txt3 === "number" && txt3 !== null) ||
      (typeof txt5 === "number" && txt5 !== null)
    ) {
      if (typeof txt1 === "number" && txt1 !== null) {
        this.smoking_amount = txt1;
        this.select_amount = txt2;
        this.amount = true;
      } else {
        this.amount = false;
      }
      if (typeof txt3 === "number" && txt3 !== null) {
        this.smoking_time = txt3;
        this.select_time = txt4;
        this.time = true;
      } else {
        this.time = false;
      }
      if (typeof txt5 === "number" && txt5 !== null) {
        this.smoking_stop = txt5;
        this.select_stop = txt6;
        this.stop = true;
      } else {
        this.stop = false;
      }
      return true;
    } else {
      return false;
    }
  }
  
}
