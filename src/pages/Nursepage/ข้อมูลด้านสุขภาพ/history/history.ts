import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EdithistoryPage } from '../edithistory/edithistory';
import {
  Http,
  Headers,
  RequestOptions
} from "@angular/http";
import { GlobalProvider } from "../../../../providers/global/global";
import moment from "moment";
import "moment/locale/TH";
/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  showData: boolean = true;
  showButtonedit: boolean;
  specify: boolean;
  hospital;
  datemineral;
  amount;

  data;

  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalProvider, private http: Http) {
    this.showButtonedit = this.checkRole(this.global.getSelectRole());
  }
  async ionViewDidLoad() {
    console.log("ionViewDidLoad HistoryPage");
    this.showData = false;
    await this.getdata()
  }

  ionViewWillEnter(){
    if(this.navParams.get("formData")){
    return  new Promise((resolve, reject) => {
      this.showData = true;
      this.specify = this.navParams.get("formData").did;
      this.hospital =  this.navParams.get("formData").hospital;
      this.datemineral= moment(this.navParams.get("formData").therapy_date,"YYYY-MM-DD").format("Do MMMM YYYY");
      this.amount= this.navParams.get("formData").volume;
        });

    }
  }


  async getdata(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = { idcard: this.global.getpatientID(), round: this.global.getSelectRound() };

   await this.http
      .post(
        "https://"+this.global.getIP()+"/healthdata.php?method=get_mineral_history&role="+this.global.getSelectRole(),
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if ( data.did !== null) {

            this.showData = true;

            this.specify = data.did;
            this.hospital = data.hospital;
            this.datemineral = moment(data.therapy_date,"YYYY-MM-DD").format("Do MMMM YYYY");
            this.amount = data.volume

          } else {
            this.showData = false;
            console.log("data : " + this.showData);
          }

        },
        error => {
          console.log(error);
        }
      );
  }

  checkRole(role){
    if(role === "พยาบาล" || role === "หมอ"){
      return true;
    }else{
      return false;
    }
  }

  edithistory(){
    this.navCtrl.push(EdithistoryPage,
      {
      "specify" : this.specify,
      "hospital" : this.hospital,
      "datemineral" : this.datemineral,
      "amount" : this.amount
    })
  }
}
