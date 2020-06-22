import { Component } from "@angular/core";
import { IodineresultdetailPage } from "../iodineresultdetail/iodineresultdetail";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { GlobalProvider } from "../../../providers/global/global";
import { Http, Headers, RequestOptions } from "@angular/http";
import moment from "moment";
import {
  FormGroup,
  FormBuilder,
  Validators,
  RequiredValidator,
} from "@angular/forms";
import "moment/locale/TH";

/**
 * Generated class for the AddiodineresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-addiodineresult",
  templateUrl: "addiodineresult.html",
})
export class AddiodineresultPage {
  formgroup: FormGroup;
  date =
    this.navParams.get("pa_fol_date") ||
    moment().add(543, "y").format("Do MMMM YYYY");
  showCompOther: boolean = false;
  showAntiOther: boolean = false;
  showBlockOther: boolean = false;
  showAntiPill: boolean = true;
  showBlockPill: boolean = true;
  antinames = [
    {
      name: "Propylthiouracil (PTU)",
    },
    {
      name: "Methimazole (MMI)",
    },
    {
      name: "Tapazole",
    },
    {
      name: "Lithium",
    },
    {
      name: "ไม่ต้องรับประทาน",
    },
    {
      name: "อื่นๆ",
    },
  ];
  betanames = [
    {
      name: "Propranolol (10)",
    },
    {
      name: "Propranolol (40)",
    },
    {
      name: "Betalol (10)",
    },
    {
      name: "Atenolol (50)",
    },
    {
      name: "ไม่ต้องรับประทาน",
    },
    {
      name: "อื่นๆ",
    },
  ];

  startMin: any;
  startMax: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public global: GlobalProvider,
    public http: Http,
    public alertCtrl: AlertController
  ) {
    this.formgroup = formBuilder.group({
      ThyroidSize: [navParams.get("pa_fol_result"), Validators.required],
      TT3_FT3: [navParams.get("ttf3_tt3"), Validators.required],
      FT4: [navParams.get("fT4_result"), Validators.required],
      TSH: [navParams.get("TSH_result"), Validators.required],
      ThyroidMed: ["", Validators.required],
      ThyroidMedVol: [navParams.get("pa_fol_anti_amount")],
      ThyroidMedRoundPerDay: [navParams.get("pa_fol_anti_daily")],
      ThyroidMedEtc: [""],
      BetaBlock: ["", Validators.required],
      BetaBlockVol: [navParams.get("pa_fol_beta_amount")],
      BetaBlockRoundPerDay: [navParams.get("pa_fol_beta_daily")],
      BetaBlockEtc: [""],
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddiodineresultPage");
  }

  update() {
    let anti: string = this.formgroup.controls.ThyroidMed.value;
    let antiother: string = this.formgroup.controls.ThyroidMedEtc.value;
    let antiMedVol: number = this.formgroup.controls.ThyroidMedVol.value;
    let antiMedPerday: number = this.formgroup.controls.ThyroidMedRoundPerDay
      .value;
    let block: string = this.formgroup.controls.BetaBlock.value;
    let blockother: string = this.formgroup.controls.BetaBlockEtc.value;
    let blockMedVol: number = this.formgroup.controls.BetaBlockVol.value;
    let blockMedPerday: number = this.formgroup.controls.BetaBlockRoundPerDay
      .value;
    if (!antiother && anti === "อื่นๆ") {
      this.presentAlert("กรุณาพิมพ์ชื่อยาต้านอาการไทรอยด์");
    } else if (
      (!antiMedVol && anti !== "ไม่ต้องรับประทาน") ||
      (!antiMedPerday && anti !== "ไม่ต้องรับประทาน")
    ) {
      this.presentAlert("กรุณาระบุปริมาณของยาต้านอาการไทรอยด์");
    } else if (!blockother && block === "อื่นๆ") {
      this.presentAlert("กรุณาพิมพ์ชื่อยา Beta-Blocker");
    } else if (
      (!blockMedVol && block !== "ไม่ต้องรับประทาน") ||
      (!blockMedPerday && block !== "ไม่ต้องรับประทาน")
    ) {
      this.presentAlert("กรุณาระบุปริมาณของยา Beta-Blocker");
    } else {
      let body = {
        follow_id: this.navParams.get("follow_id"),
        idcard: this.global.getpatientID(),
        round: this.global.getSelectRound(),

        pa_fol_date: moment(this.date, "Do MMMM YYYY").format("YYYY-MM-DD"),
        pa_fol_result: this.formgroup.controls.ThyroidSize.value,
        pa_fol: "iodine",
        ttf3_tt3: this.formgroup.controls.TT3_FT3.value,
        fT4_result: this.formgroup.controls.FT4.value,
        TSH_result: this.formgroup.controls.TSH.value,

        pa_fol_anti: this.sendThyroidMed(),
        pa_fol_anti_amount: this.formgroup.controls.ThyroidMedVol.value,
        pa_fol_anti_daily: this.formgroup.controls.ThyroidMedRoundPerDay.value,
        pa_fol_beta: this.sendBetaBlock(),
        pa_fol_beta_amount: this.formgroup.controls.BetaBlockVol.value,
        pa_fol_beta_daily: this.formgroup.controls.BetaBlockRoundPerDay.value,
      };

      var action = "insert_follow";
      let headers = new Headers({ "Content-type": "application/json" });
      let options = new RequestOptions({ headers: headers });

      this.http
        .post(
          "http://" +
            this.global.getIP() +
            "/pantient-follow.php?method=" +
            action +
            "&role=" +
            this.global.getSelectRole(),
          body,
          options
        )
        .map((res) => res.json())
        .subscribe(
          (data) => {
            this.presentAlert(data.result);
            if (data.result !== "Fail") {
              let startIndex = this.navCtrl.getActive().index;
              this.navCtrl
                .push(IodineresultdetailPage, body)
                .then(() => this.navCtrl.remove(startIndex));
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  sendBetaBlock() {
    let block: string = this.formgroup.controls.BetaBlock.value;
    if (block === "อื่นๆ") {
      return this.formgroup.controls.BetaBlockEtc.value;
    } else {
      return this.formgroup.controls.BetaBlock.value;
    }
  }
  sendThyroidMed() {
    let anti: string = this.formgroup.controls.ThyroidMed.value;
    if (anti === "อื่นๆ") {
      return this.formgroup.controls.ThyroidMedEtc.value;
    } else {
      return this.formgroup.controls.ThyroidMed.value;
    }
  }
  addThyroidMed(data) {
    if (data === "อื่นๆ") {
      this.showAntiOther = true;
      this.showAntiPill = true;
    } else if (data === "ไม่ต้องรับประทาน") {
      this.showAntiPill = false;
      this.showAntiOther = false;
      this.formgroup.controls.ThyroidMedVol.setValue(null);
      this.formgroup.controls.ThyroidMedRoundPerDay.setValue(null);
    } else {
      this.showAntiPill = true;
      this.showAntiOther = false;
      this.formgroup.controls.ThyroidMed.setValue(data);
    }
  }
  addBetaBlock(data) {
    if (data === "อื่นๆ") {
      this.showBlockOther = true;
      this.showBlockPill = true;
    } else if (data === "ไม่ต้องรับประทาน") {
      this.showBlockPill = false;
      this.showBlockOther = false;
      this.formgroup.controls.BetaBlockVol.setValue(null);
      this.formgroup.controls.BetaBlockRoundPerDay.setValue(null);
    } else {
      this.showBlockPill = true;
      this.showBlockOther = false;
      this.formgroup.controls.BetaBlock.setValue(data);
    }
  }
  setMedical() {
    let anti = this.navParams.get("pa_fol_anti");
    let beta = this.navParams.get("pa_fol_beta");
    this.formgroup.controls.ThyroidMed.setValue(anti);
    this.formgroup.controls.BetaBlock.setValue(beta);
    if (this.antinames.find((names) => names.name === anti)) {
    } else {
      this.antinames.unshift({
        name: anti,
      });
    }
    if (this.betanames.find((names) => names.name === beta)) {
    } else {
      this.betanames.unshift({
        name: beta,
      });
    }
    this.addThyroidMed(anti);
    this.addBetaBlock(beta);
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
