import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EditgeneralPage } from "../editgeneral/editgeneral";
import { GlobalProvider } from "../../../../providers/global/global";
import {
  Http,
  Response,
  Headers,
  ResponseOptions,
  RequestOptions
} from "@angular/http";
import moment from 'moment';
import 'moment/locale/TH';
/**
 * Generated class for the GeneralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-general",
  templateUrl: "general.html"
})
export class GeneralPage {
  name;
  title;
  firstname;
  lastname;
  date;
  birthday;
  age;
  idcard;
  gender;
  nationality;
  status;
  input;
  hninput;
  hnbuu;
  output;
  hnoutput;
  tel;

  showData: boolean = true;
  showButtonedit: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider,
    private http: Http
  ) {
    this.showButtonedit = this.checkRole(this.global.getSelectRole());
  }

 async getdata(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({ idcard: this.global.getpatientID(), round: this.global.getSelectRound() });
    console.log("body : " + body);
   await this.http
      .post(
        "http://192.168.31.98:8000/healthdata.php?method=get_profile&role=nurse",
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if ( data[0].firstname !== null) {
            this.showData = true;
            console.log("data : " + this.showData);
            this.name =
              data[0].title + data[0].firstname + " " + data[0].lastname;

            this.firstname = data[0].firstname;
            this.lastname = data[0].lastname;
            this.title = data[0].title;
            this.date = moment(data[0].birthdate,"YYYY-MM-DD").format("Do MMMM YYYY");
            this.age = moment().diff(moment(data[0].birthdate,"YYYY-MM-DD"), 'years');
            this.birthday = data[0].birthdate;
            this.idcard = data[0].person_id;
            this.gender = data[0].gender;
            this.nationality = data[0].nationality;
            this.status = data[0].status;
            this.input = data[1].from_h_id;
            this.hninput = data[1].to_h_id;
            this.hnbuu = data[1].Hos_base_h_id;
            this.output = data[1].from_hn;
            this.hnoutput = data[1].to_hn;
            this.tel = data[0].phone;
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

  async ionViewWillEnter() {
    console.log("ionViewWillEnter InitiallyPage");
    await this.navCtrl.getActive().component
    this.showData = false;
  }
 async ionViewDidEnter(){
    console.log("ionViewDidEnter InitiallyPage");
    await this.getdata()
  }

  editgeneral() {
    this.navCtrl.push(EditgeneralPage, {
      date: this.birthday,
      title: this.title,

      firstname: this.firstname,
      lastname: this.lastname,
      idcard: this.idcard,
      gender: this.gender,
      national: this.nationality,
      status: this.status,
      input: this.input,
      hninput: this.hninput,
      hnbuu: this.hnbuu,
      output: this.output,
      hnoutput: this.hnoutput,
      tel: this.tel
    });
  }

  checkRole(role){
    if(role === "nurse"){
      return true;
    }else{
      return false;
    }
  }
}
