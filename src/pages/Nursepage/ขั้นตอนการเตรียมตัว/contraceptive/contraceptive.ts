import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EditcontraceptivePage } from "../editcontraceptive/editcontraceptive";
import { AddcontraceptivePage } from '../addcontraceptive/addcontraceptive';
import { GlobalProvider } from "../../../../providers/global/global";
import { Http, Headers, RequestOptions } from "@angular/http";
import moment from "moment";
import "moment/locale/TH";

/**
 * Generated class for the ContraceptivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-contraceptive",
  templateUrl: "contraceptive.html",
})
export class ContraceptivePage {
  showButtonedit: boolean;
  showData:boolean;
  showUPT:boolean;
  control_name;
  control_amount;
  control_daily;

  last_peroid_date;
  last_peroid_amount;

  showControl:boolean;

  UPTs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider,
    private http: Http
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ContraceptivePage");
    if (this.global.getSelectRole() === "พยาบาล") {
      this.showButtonedit = true;
    } else {
      this.showButtonedit = false;
    }
  }
  ionViewWillEnter(){
    this.getPeroid()
    this.getUPT()
  }

  getPeroid() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = {
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound(),
    };
    this.http
      .post(
        "http://" +
          this.global.getIP() +
          "/preparephase.php?method=get_preparephase&role=" +
          this.global.getSelectRole(),
        body,
        options
      )
      .map((res) => res.json())
      .subscribe(
        (data) => {
          if (data.result) {
            console.log("error get data");
          } else {
            if(data.birth_control_name){
              this.showData = true
              this.control_name = data.birth_control_name;
            this.control_amount = data.birth_control_state;
            this.control_daily = data.birth_control_time;
            this.last_peroid_date = moment(
              data.last_period,
              "YYYY-MM-DD"
            ).format("Do MMMM YYYY");
            this.last_peroid_amount = data.last_period_amount;
            this.isControl(data.birth_control_name);
            }else{
              this.showData = false
            }
            
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getUPT() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = {
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound(),
    };
    this.http
      .post(
        "http://" +
          this.global.getIP() +
          "/preparephase.php?method=get_UTP&role=" +
          this.global.getSelectRole(),
        body,
        options
      )
      .map((res) => res.json())
      .subscribe(
        (data) => {
          if (data.result) {
            this.showUPT = false
            console.log("error get data");
          } else {
            for(let i = 0;i < data.length; i++){
              data[i].UPT_date = moment(data[i].UPT_date,"YYYY-MM-DD").format("DD/MM/YYYY")
            }
            this.UPTs = data;
            this.showUPT = true
            console.log(data)
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  isControl(txt) {
    if (txt == "ไม่ได้คุม") {
      this.showControl = false;
    } else {
      this.showControl = true;
    }
  }

  editcontraceptive() {
    this.navCtrl.push(EditcontraceptivePage, {
      control_name: this.control_name,
      control_amount: this.control_amount,
      control_daily: this.control_daily,

      last_peroid_date: moment(
        this.last_peroid_date,
        "Do MMMM YYYY"
      ).format("YYYY-MM-DD"),
      last_peroid_amount: this.last_peroid_amount,
      showControl: this.showControl
    });
  }
  addcontraceptive(id) {
    if(id == "add"){
      this.navCtrl.push(AddcontraceptivePage,{data : id});
    }else{
      let item = this.UPTs[id]
      item.UPT_date = moment(item.UPT_date,"DD/MM/YYYY").format("YYYY-MM-DD")
    
      this.navCtrl.push(AddcontraceptivePage, item);
    }
    
  }
}
