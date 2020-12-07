import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { GlobalProvider } from "../../../providers/global/global";
import moment from 'moment';
import 'moment/locale/TH';
import {
  Http,
  Headers,
  RequestOptions
} from "@angular/http";

/**
 * Generated class for the AppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
})
export class AppointmentPage {
  startMin: any;
  startMax: any;
  date
  items:any
  showData:boolean = false
  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalProvider,public http: Http,
    public alertCtrl: AlertController) {
    this.startMin = moment().add(443, 'y').format("YYYY");
    this.startMax = moment().add(643, 'y').format("YYYY");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentPage');
    this.date = moment().add(543, 'y').format()
    this.getdata()
  }

  getdata(){
    let body = JSON.stringify({

      date: moment(this.date).format("YYYY-MM-DD")


   });
   console.log(body)

   let headers = new Headers({ "Content-type": "application/json" });
   let options = new RequestOptions({ headers: headers });
      this.http
        .post(
          "https://"+this.global.getIP()+"/preparephase.php?method=get_prep&role="+this.global.getSelectRole(),
          body,
          options
        )
        .map(res => res.json())
        .subscribe(
          data => {

            if(data.result !== "Fail"){
              this.items = data
              console.log(data)
              this.showData = true
            }else{
              this.showData = false
            }
            console.log(this.showData)
          },
          error => {
            console.log(error);
          }
        );
  }
  async presentAlert(txt: string) {
    let alert = await this.alertCtrl.create({
      title: 'การแจ้งเตือน',
      subTitle: txt,
      buttons: ['Ok']
    });
    alert.present();
  }
}
