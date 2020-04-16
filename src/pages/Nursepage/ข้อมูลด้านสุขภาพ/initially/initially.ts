import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EditinitiallyPage } from "../editinitially/editinitially";
import {
  Http,
  Response,
  Headers,
  ResponseOptions,
  RequestOptions,
} from "@angular/http";
import { GlobalProvider } from "../../../../providers/global/global";

/**
 * Generated class for the InitiallyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-initially",
  templateUrl: "initially.html",
})
export class InitiallyPage {
  edgy: boolean;
  sleep: boolean;
  eat: boolean;
  hot: boolean;
  fast: boolean;
  shakinHands: boolean;
  neck: boolean;
  gland: boolean;
  bigeyes: boolean;
  shit: boolean;
  weight: boolean;
  leg: boolean;
  fshit: boolean;
  disease: boolean;
  diseaseName: string;

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
          this.navParams.get("formData").frustration === 1 ||
          this.navParams.get("formData").hard_sleep === 1 ||
          this.navParams.get("formData").eat_a_lot === 1 ||
          this.navParams.get("formData").feel_hot === 1 ||
          this.navParams.get("formData").fast_heartbeat === 1 ||
          this.navParams.get("formData").shaking_hand === 1 ||
          this.navParams.get("formData").goiter === 1 ||
          this.navParams.get("formData").thyroid_lump === 1 ||
          this.navParams.get("formData").bulging_eye === 1 ||
          this.navParams.get("formData").digest_3 === 1 ||
          this.navParams.get("formData").lose_weight === 1 ||
          this.navParams.get("formData").weak_arm === 1 ||
          this.navParams.get("formData").few_period === 1 ||
          this.checkString(this.navParams.get("formData").disease_name) === true
        ) {
          this.showData = true;
          this.edgy = this.navParams.get("formData").frustration;
          this.sleep = this.navParams.get("formData").hard_sleep;
          this.eat = this.navParams.get("formData").eat_a_lot;
          this.hot = this.navParams.get("formData").feel_hot;
          this.fast = this.navParams.get("formData").fast_heartbeat;
          this.shakinHands = this.navParams.get("formData").shaking_hand;
          this.neck = this.navParams.get("formData").goiter;
          this.gland = this.navParams.get("formData").thyroid_lump;
          this.bigeyes = this.navParams.get("formData").bulging_eye;
          this.shit = this.navParams.get("formData").digest_3;
          this.weight = this.navParams.get("formData").lose_weight;
          this.leg = this.navParams.get("formData").weak_arm;
          this.fshit = this.navParams.get("formData").few_period;
          this.disease = this.checkString(
            this.navParams.get("formData").disease_name
          );
          this.diseaseName = this.navParams.get("formData").disease_name;
        } else {
          this.showData = false;
          this.edgy = this.navParams.get("formData").frustration;
          this.sleep = this.navParams.get("formData").hard_sleep;
          this.eat = this.navParams.get("formData").eat_a_lot;
          this.hot = this.navParams.get("formData").feel_hot;
          this.fast = this.navParams.get("formData").fast_heartbeat;
          this.shakinHands = this.navParams.get("formData").shaking_hand;
          this.neck = this.navParams.get("formData").goiter;
          this.gland = this.navParams.get("formData").thyroid_lump;
          this.bigeyes = this.navParams.get("formData").bulging_eye;
          this.shit = this.navParams.get("formData").digest_3;
          this.weight = this.navParams.get("formData").lose_weight;
          this.leg = this.navParams.get("formData").weak_arm;
          this.fshit = this.navParams.get("formData").few_period;
          this.disease = this.checkString(
            this.navParams.get("formData").disease_name
          );
          this.diseaseName = this.navParams.get("formData").disease_name;
        }
      });
    }
  }

  setInit(data) {
    if (
      data.frustration === 1 ||
      data.hard_sleep === 1 ||
      data.eat_a_lot === 1 ||
      data.feel_hot === 1 ||
      data.fast_heartbeat === 1 ||
      data.shaking_hand === 1 ||
      data.goiter === 1 ||
      data.thyroid_lump === 1 ||
      data.bulging_eye === 1 ||
      data.digest_3 === 1 ||
      data.lose_weight === 1 ||
      data.weak_arm === 1 ||
      data.few_period === 1 ||
      this.checkString(data.disease_name) === true
    ) {
      this.showData = true;

      this.edgy = data.frustration;
      this.sleep = data.hard_sleep;
      this.eat = data.eat_a_lot;
      this.hot = data.feel_hot;
      this.fast = data.fast_heartbeat;
      this.shakinHands = data.shaking_hand;
      this.neck = data.goiter;
      this.gland = data.thyroid_lump;
      this.bigeyes = data.bulging_eye;
      this.shit = data.digest_3;
      this.weight = data.lose_weight;
      this.leg = data.weak_arm;
      this.fshit = data.few_period;
      this.disease = this.checkString(data.disease_name);
    } else {
      this.showData = false;
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
          "/healthdata.php?method=get_init-phase&role=" +
          this.global.getSelectRole(),
        body,
        options
      )
      .map((res) => res.json())
      .subscribe(
        (data) => {
          this.setInit(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  checkString(txt) {
    if (typeof txt === "string" && txt !== null && txt !== "") {
      this.diseaseName = txt;
      return true;
    } else {
      return false;
    }
  }

  editinitially() {
    this.navCtrl.push(EditinitiallyPage, {
      edgy: this.edgy,
      sleep: this.sleep,
      eat: this.eat,
      hot: this.hot,
      fast: this.fast,
      shakinHands: this.shakinHands,
      neck: this.neck,
      gland: this.gland,
      bigeyes: this.bigeyes,
      shit: this.shit,
      weight: this.weight,
      leg: this.leg,
      fshit: this.fshit,
      disease: this.disease,
      diseaseName: this.diseaseName,
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
}
