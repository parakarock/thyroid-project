import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EditgeneralPage } from "../editgeneral/editgeneral";
import { GlobalProvider } from "../../../../providers/global/global";
import {
  Http,
  Headers,
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
  name ;
  title
  firstname
  lastname;
  date;
  birthday;
  age;
  idcard;
  gender;
  nationality;
  status;
  input;  //ชื่อ รพ. เข้า
  hninput; //hn รพ. เข้า
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
        "http://"+this.global.getIP()+"/healthdata.php?method=get_profile&role="+this.global.getSelectRole(),
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if ( data[0].firstname !== null) {
            this.showData = true;
            console.log("data : " + data);
            this.name =
              data[0].title + data[0].firstname + " " + data[0].lastname;

            this.firstname = data[0].firstname;
            this.lastname = data[0].lastname;
            this.title = data[0].title;
            this.date = moment(data[0].birthdate,"YYYY-MM-DD").format("Do MMMM YYYY");
            this.age = moment().diff(moment(data[0].birthdate,"YYYY-MM-DD").subtract(543, 'y'), 'years');
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


  async ionViewDidLoad() {
    this.showData = false;
    await this.getdata()
  }
  ionViewWillEnter(){
    if(this.navParams.get("formData")){
    return  new Promise((resolve, reject) => {
    this.name = this.navParams.get("formData").title+this.navParams.get("formData").fname+" "+this.navParams.get("formData").lname;
    this.title = this.navParams.get("formData").title;
    this.firstname= this.navParams.get("formData").fname;
    this.lastname= this.navParams.get("formData").lname;
    this.date = moment(this.navParams.get("formData").birthday,"YYYY-MM-DD").format("Do MMMM YYYY");
    this.age= moment().diff(moment(this.navParams.get("formData").birthday,"YYYY-MM-DD").subtract(543, 'y'), 'years');
    this.idcard= this.navParams.get("formData").idCard;
    this.gender= this.navParams.get("formData").sex;
    this.nationality= this.navParams.get("formData").National;
    this.status= this.navParams.get("formData").status;
    this.input= this.navParams.get("formData").from_name2;  //ชื่อ รพ. เข้า
    this.hninput= this.navParams.get("formData").from_id; //hn รพ. เข้า
    this.hnbuu= this.navParams.get("formData").Hos_base_id;
    this.output= this.navParams.get("formData").to_name2;
    this.hnoutput= this.navParams.get("formData").to_id;
    this.tel= this.navParams.get("formData").tel;

        });

    }
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
    if(role === "พยาบาล"){
      return true;
    }else{
      return false;
    }
  }

}
