import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { AdddatacontactPage } from '../../AdminPage/adddatacontact/adddatacontact';
import { ShowdatacontactPage } from '../../AdminPage/showdatacontact/showdatacontact';
import { GlobalProvider } from "../../../providers/global/global";
import { Http, Headers, RequestOptions } from "@angular/http";

/**
 * Generated class for the DatacontactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datacontact',
  templateUrl: 'datacontact.html',
})
export class DatacontactPage {
  contacts: any = [];
  data: any = [];
  searchTerm;
  showData: boolean = false;
  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    public global: GlobalProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatacontactPage');
  }
  ionViewWillEnter() {
    this.setdata();
  }

  setdata() {
    var action = "get_contact";
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    this.http
      .post(
        "http://" +
          this.global.getIP() +
          "/contact.php?method=" +
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
            this.contacts = data;
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
    this.contacts = this.data;
    if (this.searchTerm) {
      this.contacts = this.contacts.filter((item) => {
        return (
          item.contact_fname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >
          -1
        );
      });
    }
  }

  addcontact(index) {
    console.log(index);
    if (index || index == 0) {
      let item = this.contacts[index];
      item["event"] = "edit";
      this.navCtrl.push(AdddatacontactPage, item);
    } else {
      this.navCtrl.push(AdddatacontactPage, { event: "add" });
    }
  }
  showDetail(index){
    if (index || index == 0) {
      let item = this.contacts[index];
      this.navCtrl.push(ShowdatacontactPage, item);
    }
  }
  deletecontact(number, id) {
    if (number > -1) {
      this.contacts.splice(number, 1);

      let body = { contact_id: id };
      let headers = new Headers({ "Content-type": "application/json" });
      let options = new RequestOptions({ headers: headers });
      this.http
        .post(
          "http://" +
            this.global.getIP() +
            "/contact.php?method=delete_contact&role=" +
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
      title: "ลบข้อมูลติดต่อ",
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
            this.deletecontact(number, id);
          },
        },
      ],
    });
    alert.present();
  }
 
}
