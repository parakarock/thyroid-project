import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import {
  Http,
  Response,
  Headers,
  ResponseOptions,
  RequestOptions
} from "@angular/http";
import { GlobalProvider } from "../../../../providers/global/global";

/**
 * Generated class for the EditinitiallyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-editinitially",
  templateUrl: "editinitially.html"
})
export class EditinitiallyPage {
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private http: Http,
    public global: GlobalProvider
  ) {
    this.edgy = navParams.get("edgy");
    this.sleep = navParams.get("sleep");
    this.eat = navParams.get("eat");
    this.hot = navParams.get("hot");
    this.fast = navParams.get("fast");
    this.shakinHands = navParams.get("shakinHands");
    this.neck = navParams.get("neck");
    this.gland = navParams.get("gland");
    this.bigeyes = navParams.get("bigeyes");
    this.shit = navParams.get("shit");
    this.weight = navParams.get("weight");
    this.leg = navParams.get("leg");
    this.fshit = navParams.get("fshit");
    this.disease = navParams.get("disease");
    this.diseaseName = navParams.get("diseaseName");

    this.showFormSex = navParams.get("showFormSex");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EditinitiallyPage");
  }

  beforeSend(x) {
    if (x&&this.diseaseName) {
      return this.diseaseName;
    } else {
      return null;
    }
  }
  editData(data) {
    if (data) {
      return 1;
    } else if (!data) {
      return 0;
    }else{
      return data;
    }
  }
  updateData() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound(),
      frustration: this.editData(this.edgy),
      hard_sleep: this.editData(this.sleep),
      eat_a_lot: this.editData(this.eat),
      feel_hot: this.editData(this.hot),
      fast_heartbeat: this.editData(this.fast),
      shaking_hand: this.editData(this.shakinHands),
      goiter: this.editData(this.neck),
      thyroid_lump: this.editData(this.gland),
      bulging_eye: this.editData(this.bigeyes),
      digest_3: this.editData(this.shit),
      lose_weight: this.editData(this.weight),
      weak_arm: this.editData(this.leg),
      few_period: this.editData(this.fshit),
      disease_name: this.beforeSend(this.disease)
    });
    console.log(body);
    this.http
      .post(
        "http://192.168.31.98:8000/healthdata.php?method=update_init-phase&role=nurse",
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if(data.result){
            this.presentAlert(data.result);
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      title: "ยืนยันการอัพเดทข้อมูล",
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
            this.updateData();
            // this.navCtrl.remove(this.navCtrl.getPrevious().index);
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
  async presentAlert(txt: string) {
    let alert = await this.alertCtrl.create({
      title: "แจ้งเตือน",
      subTitle: txt,
      buttons: ["Ok"]
    });
    alert.present();
  }

  changeedgy() {
    this.edgy = !this.edgy;
    console.log(this.edgy);
  }
  changesleep() {
    this.sleep = !this.sleep;
    console.log(this.sleep);
  }
  changeeat() {
    this.eat = !this.eat;
    console.log(this.eat);
  }
  changehot() {
    this.hot = !this.hot;
    console.log(this.hot);
  }
  changefast() {
    this.fast = !this.fast;
    console.log(this.fast);
  }
  changeshakinHands() {
    this.shakinHands = !this.shakinHands;
    console.log(this.shakinHands);
  }
  changeneck() {
    this.neck = !this.neck;
    console.log(this.neck);
  }
  changegland() {
    this.gland = !this.gland;
    console.log(this.gland);
  }
  changebigeyes() {
    this.bigeyes = !this.bigeyes;
    console.log(this.bigeyes);
  }
  changeshit() {
    this.shit = !this.shit;
    console.log(this.shit);
  }
  changeweight() {
    this.weight = !this.weight;
    console.log(this.weight);
  }
  changeleg() {
    this.leg = !this.leg;
    console.log(this.leg);
  }
  changefshit() {
    this.fshit = !this.fshit;
    console.log(this.fshit);
  }
  changeOther() {
    this.disease = !this.disease;

    console.log(this.disease);
  }
  echo() {
    console.log(this.diseaseName);
  }
}
