import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditgeneralPage } from '../editgeneral/editgeneral';
import { GlobalProvider } from "../../../../providers/global/global";
import {
  Http,
  Response,
  Headers,
  ResponseOptions,
  RequestOptions
} from "@angular/http";

/**
 * Generated class for the GeneralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-general',
  templateUrl: 'general.html',
})
export class GeneralPage {
  name;
  title;
  firstname; 
  lastname;
  date;
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
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider, private http: Http) {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = { idcard: this.global.patientID, round: this.global.round };
    console.log("body : " + body);
    this.http
      .post(
        "http://10.80.34.218:8000/healthdata.php?method=get_profile&role=nurse",
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          this.data = JSON.stringify(data);
          this.name =
            data[0].title + data[0].firstname + " " + data[0].lastname;
          
          this.firstname=data[0].firstname
          this.lastname=data[0].lastname
          this.title=data[0].title
          this.date=data[0].birthdate;
          this.age = 18;
          this.idcard = data[0].person_id
          this.gender = data[0].gender
          this.nationality = data[0].nationality
          this.status = data[0].status
          this.input =data[1].from_h_id
          this.hninput = data[1].to_h_id
          this.hnbuu = data[1].Hos_base_h_id
          this.output = data[1].from_hn
          this.hnoutput = data[1].to_hn
          this.tel = data[0].phone
          

        },
        error => {
          console.log(error);
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralPage');
  }

  async onClickLoginButton() {
    
  }

  editgeneral(){
    this.navCtrl.push(EditgeneralPage,{name:this.name,
      date:this.date,
      title:this.title,

      firstname:this.firstname,
      lastname:this.lastname,
      age:this.age,
      idcard:this.idcard,
      gender:this.gender,
      nationality:this.nationality,
      status:this.status,
      input:this.input,
      hninput:this.hninput,
      hnbuu:this.hnbuu,
      output:this.output,
      hnoutput:this.hnoutput,
      tel:this.tel});
  }


}
