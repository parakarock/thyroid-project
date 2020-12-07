import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { InsertPage } from "../insert/insert";
import { GlobalProvider } from "../../../../providers/global/global";
import { Http, Headers, RequestOptions } from "@angular/http";
import moment from "moment";
import "moment/locale/TH";
import { CompileMetadataResolver } from "@angular/compiler";

/**
 * Generated class for the ToxinthyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-toxinthy",
  templateUrl: "toxinthy.html",
})
export class ToxinthyPage {
  month: string;
  year: string;
  comp_status: string;
  comp_anit_thy_name: string;
  comp_anit_thy_amount: number;
  comp_anit_thy_daily: number;
  comp_beta_name: string;
  comp_beta_amount: number;
  comp_beta_daily: number;
  comp_indication: string;

  monShow;
  yearShow;

  toxic: string;
  toxicOther: string;
  allergy: string;
  allergyOther: string;
  otherStatus = false;
  otherAllergy = false;
  showData: boolean = true;
  showButtonedit: boolean =this.checkRole(this.global.getSelectRole());
  toxics = [
    {
      name: "ไม่มี",
    },
    {
      name: "thyroid crisis",
    },
    {
      name: "thyrotoxic myopathy",
    },
    {
      name: "heart arrhythmia",
    },
    {
      name: "heart failure",
    },
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider,
    public http: Http
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ToxinthyPage");
    this.getdata();

  }
  checkRole(role) {
    if (role === "หมอ") {
      return true;
    } else {
      return false;
    }
  }
  ionViewWillEnter() {
    if (this.navParams.get("formData")) {
      console.log(this.navParams.get("formData").month)
      return new Promise((resolve, reject) => {
        this.showData = true;
        this.month = this.navParams.get("formData").month;
        this.monShow = moment(
          this.navParams.get("formData").month,
          "MMMM"
        ).fromNow(true);
        this.year = this.navParams.get("formData").year;
        this.yearShow = moment(this.navParams.get("formData").year, "YYYY")
          .subtract(543, "y")
          .fromNow(true);
        this.comp_status = this.navParams.get("formData").comp_status;
        this.comp_anit_thy_name = this.navParams.get(
          "formData"
        ).comp_anit_thy_name;
        this.comp_anit_thy_amount = this.navParams.get(
          "formData"
        ).comp_anit_thy_amount;
        this.comp_anit_thy_daily = this.navParams.get(
          "formData"
        ).comp_anit_thy_daily;
        this.comp_beta_name = this.navParams.get("formData").comp_beta_name;
        this.comp_beta_amount = this.navParams.get("formData").comp_beta_amount;
        this.comp_beta_daily = this.navParams.get("formData").comp_beta_daily;
        this.comp_indication = this.navParams.get("formData").comp_indication;
        this.setToxic();
        this.setAllergy();
      });
    }
  }
  getdata() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound(),
    });
    console.log("body : " + body);
    this.http
      .post(
        "https://" +
          this.global.getIP() +
          "/healthdata.php?method=get_complication&role=" +
          this.global.getSelectRole(),
        body,
        options
      )
      .map((res) => res.json())
      .subscribe(
        (data) => {
          if (data.month) {
            this.month = data.month;
            this.monShow = moment(data.month, "MMMM").fromNow(true);
            this.year = data.year;
            this.yearShow = moment(data.year, "YYYY")
              .subtract(543, "y")
              .fromNow(true);
            this.comp_status = data.comp_status;
            this.comp_anit_thy_name = data.comp_anit_thy_name;
            this.comp_anit_thy_amount = data.comp_anit_thy_amount;
            this.comp_anit_thy_daily = data.comp_anit_thy_daily;
            this.comp_beta_name = data.comp_beta_name;
            this.comp_beta_amount = data.comp_beta_amount;
            this.comp_beta_daily = data.comp_beta_daily;
            this.comp_indication = data.comp_indication;
            console.log(data);
            this.setToxic();
            this.setAllergy();
          } else {
            this.showData = false;
            console.log("data : " + this.showData);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  setToxic() {
    if (this.toxics.find((names) => names.name === this.comp_status)) {
      this.toxic = this.comp_status;
      this.toxicOther = "";
    } else {
      this.toxic = "heart arrhythmia";
      this.toxicOther = this.comp_status;
    }
  }
  setAllergy() {
    let allergy = this.comp_indication;
    if (
      allergy != "medical failure" &&
      allergy != "มีภาวะแทรกซ้อนของโรค" &&
      allergy != "Major adverse reactions to" &&
      allergy != "drug allergy" &&
      allergy != "jaundice" &&
      allergy != "agranulocytosis"
    ) {
      this.allergy = "อาการแพ้ยา";
      this.allergyOther = allergy;
    } else {
      this.allergy = allergy;
      this.allergyOther = "";
    }
  }

  insert() {
    this.navCtrl.push(InsertPage, {
      month: this.month,
      year: this.year,
      comp_status: this.comp_status,
      comp_anit_thy_name: this.comp_anit_thy_name,
      comp_anit_thy_amount: this.comp_anit_thy_amount,
      comp_anit_thy_daily: this.comp_anit_thy_daily,
      comp_beta_name: this.comp_beta_name,
      comp_beta_amount: this.comp_beta_amount,
      comp_beta_daily: this.comp_beta_daily,
      comp_indication: this.comp_indication,
    });
  }
}
