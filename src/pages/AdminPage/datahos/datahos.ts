import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { AddhosPage } from "../../AdminPage/addhos/addhos";
import { ShowhosPage } from "../../AdminPage/showhos/showhos";
import { GlobalProvider } from "../../../providers/global/global";
import { Http, Headers, RequestOptions } from "@angular/http";
/**
 * Generated class for the DatahosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-datahos",
  templateUrl: "datahos.html",
})
export class DatahosPage {
  hospitals: any = [];
  data: any = [];
  searchTerm;
  showData: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    public global: GlobalProvider,
    public alertCtrl: AlertController
  ) {}

  setdata() {
    var action = "get_hospital";
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    this.http
      .post(
        "https://" +
          this.global.getIP() +
          "/admin.php?method=" +
          action +
          "&role=" +
          this.global.getSelectRole(),

        options
      )
      .map((res) => res.json())
      .subscribe(
        (data) => {
          if (data.result !== "Fail") {
            this.showData = true;
            this.data = data;
            this.hospitals = data;
            console.log(data);
          } else {
            this.showData = false;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  setFilteredItems() {
    this.hospitals = this.data;
    if (this.searchTerm) {
      this.hospitals = this.hospitals.filter((item) => {
        return (
          item.hos_name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >
          -1
        );
      });
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DatahosPage");
  }
  ionViewWillEnter() {
    this.setdata();
  }
  addhos(index) {
    console.log(index);
    if (index || index == 0) {
      let item = this.hospitals[index];
      item["event"] = "edit";
      this.navCtrl.push(AddhosPage, item);
    } else {
      this.navCtrl.push(AddhosPage, { event: "add" });
    }
  }
  showDetail(index){
    if (index || index == 0) {
      let item = this.hospitals[index];
      this.navCtrl.push(ShowhosPage, item);
    }
  }

  deletehos(number, id) {
    if (number > -1) {
      this.hospitals.splice(number, 1);

      let body = { id: id };
      let headers = new Headers({ "Content-type": "application/json" });
      let options = new RequestOptions({ headers: headers });
      this.http
        .post(
          "https://" +
            this.global.getIP() +
            "/admin.php?method=delete_hospital&role=" +
            this.global.getSelectRole(),
          body,
          options
        )
        .map((res) => res.json())
        .subscribe(
          (data) => {
            this.presentAlert(data.result);
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

  async presentConfirm(txt, number, id) {
    let alert = await this.alertCtrl.create({
      title: "ลบข้อมูลโรงพยาบาล",
      message: txt,
      buttons: [
        {
          text: "ยกเลิก",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
        {
          text: "ยืนยัน",
          handler: () => {
            this.deletehos(number, id);
          },
        },
      ],
    });
    alert.present();
  }
}
