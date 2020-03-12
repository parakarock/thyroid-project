import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../../../providers/global/global";
import {
  Http,
  Response,
  Headers,
  ResponseOptions,
  RequestOptions
} from "@angular/http";

/**
 * Generated class for the EditgeneralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editgeneral',
  templateUrl: 'editgeneral.html',
})
export class EditgeneralPage {
  to: string;
    title;
   fname;
  lname;
   Date;
   age;
   idcard;
  gender;
  national;
  status;
  input;
  hninput;
  hnbuu;
  output;
  hnoutput;
  tel;
   data: any;
  


  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider, private http: Http) {
    this.title = navParams.get("title");
    this.fname = navParams.get("firstname");
    this.lname = navParams.get("lastname");
    this.Date = navParams.get("date");
    this.idcard = navParams.get("idcard");
    this.gender = navParams.get("gender");
    this.national = navParams.get("national");
    this.status = navParams.get("status");
    this.input = navParams.get("input");
    this.hninput = navParams.get("hninput");
    this.hnbuu = navParams.get("hnbuu");
    this.output = navParams.get("output");
    this.hnoutput = navParams.get("hnoutput");
    this.tel = navParams.get("tel");
    
    
  }
save(){
  let headers = new Headers({ "Content-type": "application/json" });
  let options = new RequestOptions({ headers: headers });
 let body = {
   idcard: this.idcard,
    title: this.title,
    firstname: this.fname,
    lastname: this.lname,
    dof: this.Date,
    gender: this.gender,
    national: this.national,
    status: this.status,
    phone:this.tel,
    from_id:this.hninput,
    to_id:this.hnoutput ,
    Hos_base_id: this.hnbuu,
    from_name:this.input ,
    to_name:this.output 


  };

  console.log("body : " + body);
  this.http
    .post(
      "http://10.80.34.218:8000/healthdata.php?method=update_profile&role=nurse",
      body,
      options
    )
   .map(res => res.json())
   .subscribe(
      data => {



     },
     error => {
       console.log(error);
     }
   );
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditgeneralPage');
  }

 
}
