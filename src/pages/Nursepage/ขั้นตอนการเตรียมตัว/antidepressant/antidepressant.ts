import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EditantidepressantPage } from "../editantidepressant/editantidepressant";
import { GlobalProvider } from "../../../../providers/global/global";
import moment from "moment";
import "moment/locale/TH";

/**
 * Generated class for the AntidepressantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-antidepressant",
  templateUrl: "antidepressant.html",
})
export class AntidepressantPage {
  dateBefore;
  dateAfter;
  isControl: boolean;
  Control: string;
  showButtonedit: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad AntidepressantPage");
    this.setData(this.navParams.get("isControl"));
    this.showButtonedit = this.checkRole(this.global.getSelectRole());
  }
  ionViewWillEnter() {
    if (this.navParams.get("formData")) {
      this.setData(this.navParams.get("formData").period_control);
    }
  }
  checkRole(role) {
    if (role === "หมอ") {
      return true;
    } else {
      return false;
    }
  }
  setData(txt) {
    if (txt == "ต้อง") {
      this.isControl = true;
      this.Control = "ต้อง"
      this.dateBefore = moment(this.global.getdate(), "YYYY-MM-DD")
        .subtract(3, "days")
        .format("Do MMMM YYYY");
      this.dateAfter = moment(this.global.getdate(), "YYYY-MM-DD")
        .add(4, "days")
        .format("Do MMMM YYYY");
    } else {
      this.isControl = false;
      this.Control = "ไม่ต้อง"
    }
  }

  editantidepressant() {
    this.navCtrl.push(EditantidepressantPage, {
      isControl: this.Control,
    });
  }
}
