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
import { stringify } from "@angular/core/src/util";

/**
 * Generated class for the EditTabooPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-edit-taboo",
  templateUrl: "edit-taboo.html"
})
export class EditTabooPage {
  showFormSex: boolean;
  NeckSurgery: boolean;
  Irradiate: boolean;
  Correction: boolean;
  child: boolean;
  Amblyopia: boolean;
  difficult: boolean;
  recommend: boolean;
  Injection: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private http: Http,
    public global: GlobalProvider
  ) {
    this.showFormSex = this.checkSex(this.global.getSex());
    this.NeckSurgery = this.checkNull(navParams.get("NeckSurgery"));
    this.Irradiate = this.checkNull(navParams.get("Irradiate"));
    this.Correction = this.checkNull(navParams.get("Correction"));
    this.child = this.checkNull(navParams.get("child"));
    this.Amblyopia = this.checkNull(navParams.get("Amblyopia"));
    this.difficult = this.checkNull(navParams.get("difficult"));
    this.recommend = this.checkNull(navParams.get("recommend"));
    this.Injection = this.checkNull(navParams.get("Injection"));
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EditTabooPage");
  }
  checkSex(sex) {
    if (sex === "หญิง") {
      return true;
    } else {
      return false;
    }
  }
  changeNeckSurgery() {
    this.NeckSurgery = !this.NeckSurgery;
    console.log(this.NeckSurgery);
  }
  changeIrradiate() {
    this.Irradiate = !this.Irradiate;
    console.log(this.Irradiate);
  }
  changeCorrection() {
    this.Correction = !this.Correction;
    console.log(this.Correction);
  }
  changechild() {
    this.child = !this.child;
    console.log(this.child);
  }
  changeAmblyopia() {
    this.Amblyopia = !this.Amblyopia;
    console.log(this.Amblyopia);
  }
  changedifficult() {
    this.difficult = !this.difficult;
    console.log(this.difficult);
  }
  changerecommend() {
    this.recommend = !this.recommend;
    console.log(this.recommend);
  }
  changeInjection() {
    this.Injection = !this.Injection;
    console.log(this.Injection);
  }

  checkNull(data) {
    if (data === null) {
      return false;
    } else if (data === 0) {
      return false;
    } else if (data === 1) {
      return true;
    } else if (data === undefined){
      return false
    }
  }

  editData(data){
    if(data === true){
      return 1;
    }
    if(data === false){
      return 0;
    }
    if (data === null) {
      return 1;
    }
  }

  updateTaboo() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = {
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound(),

      therapy_1: this.editData(this.NeckSurgery),
      therapy_2: this.editData(this.Irradiate),
      therapy_3: this.editData(this.Correction),
      therapy_4: this.editData(this.child),
      therapy_5: this.editData(this.Amblyopia),
      therapy_6: this.editData(this.difficult),
      therapy_7: this.editData(this.recommend),
      therapy_8: this.editData(this.Injection)
    };
    
    this.navCtrl.getPrevious().data.formData = body
      this.http
        .post(
          "http://"+this.global.getIP()+"/healthdata.php?method=update_mineral_therapy&role="+this.global.getSelectRole(),
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
            this.updateTaboo();
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
  async presentAlert(txt: string) {
    let alert = await this.alertCtrl.create({
      title: "การแจ้งเตือน",
      subTitle: txt,
      buttons: ["Ok"]
    });
    alert.present();
  }
}
