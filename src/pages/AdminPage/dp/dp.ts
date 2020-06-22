import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { AdddatauserPage } from "../../AdminPage/adddatauser/adddatauser";
import { ShowuserPage } from "../../AdminPage/showuser/showuser";
import { GlobalProvider } from "../../../providers/global/global";
import { Http, Headers, RequestOptions } from "@angular/http";

@IonicPage()
@Component({
  selector: "page-dp",
  templateUrl: "dp.html",
})
export class DpPage {
  items: any = [];
  data: any = [];
  searchTerm;
  showData: boolean = false;
  title = this.navParams.get("title");
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    public global: GlobalProvider,
    public alertCtrl: AlertController
  ) {}

  setdata() {
    let body = { search: this.navParams.get("search") };
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    console.log(JSON.stringify(body));
    this.http
      .post(
        "http://" +
          this.global.getIP() +
          "/admin.php?method=get_user&role=" +
          this.global.getSelectRole(),
        body,
        options
      )
      .map((res) => res.json())
      .subscribe(
        (data) => {
          if (data.result !== "Fail") {
            this.showData = true;
            this.data = data;
            this.items = data;
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
    this.items = this.data;
    if (this.searchTerm) {
      this.items = this.items.filter((item) => {
        return (
          item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
        );
      });
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DpPage");
  }
  ionViewWillEnter() {
    this.setdata();
  }
  adddatauser(index) {
    console.log(index);
    if (index || index == 0) {
      let item = this.items[index];
      item["event"] = "edit";
      this.navCtrl.push(AdddatauserPage, item);
    } else {
      this.navCtrl.push(AdddatauserPage, {
        event: "add",
        role: this.navParams.get("search"),
      });
    }
  }
  showDetail(index){
    if (index || index == 0) {
      let item = this.items[index];
      if(this.navParams.get("search") == 'ผู้ป่วย'){
        item["header"] = "รายละเอียดข้อมูลผู้ป่วย";
      } else if(this.navParams.get("search") == 'หมอ'){
        item["header"] = "รายละเอียดข้อมูลหมอ";
      }else{
        item["header"] = "รายละเอียดข้อมูลพยาบาล";
      }
      
      this.navCtrl.push(ShowuserPage,item);
    }
  }

  deletehos(number, id) {
    if (number > -1) {
      this.items.splice(number, 1);

      let body = { idcard: id };
      let headers = new Headers({ "Content-type": "application/json" });
      let options = new RequestOptions({ headers: headers });
      this.http
        .post(
          "http://" +
            this.global.getIP() +
            "/admin.php?method=delete_user&role=" +
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
      title: "ลบข้อมูลผู้ใช้",
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
