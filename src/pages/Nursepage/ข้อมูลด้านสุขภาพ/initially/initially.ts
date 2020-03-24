import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EditinitiallyPage } from "../editinitially/editinitially";
import {
  Http,
  Response,
  Headers,
  ResponseOptions,
  RequestOptions
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
  templateUrl: "initially.html"
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
  showData: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider,
    private http: Http
  ) {
    this.showFormSex = this.checkSex(this.global.getSex());
    this.showButtonedit = this.checkRole(this.global.getSelectRole());
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad InitiallyPage");
    this.getdata();
  }

  ionViewWillEnter(){
    this.getdata();
  }

  async getdata() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      idcard: this.global.patientID,
      round: this.global.getSelectRound()
    });
    console.log("body : " + body);
    await this.http
      .post(
        "http://192.168.43.140:8000/healthdata.php?method=get_init-phase&role=nurse",
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(
            this.checkString(data.disease_name) + " ddddddddddddddd" + data.disease_name
          );
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
            this.showData = !this.showData;
            console.log("data : " + this.showData);
          }
        },
        error => {
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

      showFormSex: this.showFormSex
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
    if (role === "nurse") {
      return true;
    } else {
      return false;
    }
  }
}
