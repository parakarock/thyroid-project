import { EditlabtestPage } from '../editlabtest/editlabtest';
import { AddlabtestPage } from '../addlabtest/addlabtest';
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
 * Generated class for the LabtestresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-labtestresult',
  templateUrl: 'labtestresult.html',
})
export class LabtestresultPage {
  round;
  public obj:any;
  data:any;
  lab:any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalProvider, private http: Http) {
    
    // let headers = new Headers({ "Content-type": "application/json" });
    // let options = new RequestOptions({ headers: headers });
    // let body = { idcard: this.global.patientID, round: this.global.round };
    // console.log("body : " + body);
    // this.http
    //   .post(
    //     "http://10.80.34.218:8000/labtest.php?method=get_labtest&role=doctor",
    //     body,
    //     options
    //   )
      // .map(res => res.json())
      // .subscribe(
      //   data => {
      //     this.data = JSON.stringify(data);
      //     this.lab = this.data  
      //     console.log("lab : " + this.lab);
      //   },
      //   error => {
      //     console.log(error);
        //  }
      // );
    
     
       
   
      

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabtestresultPage');
  }

  onClickAddLabTest(){
    this.navCtrl.push(AddlabtestPage);
  }

  onClickEditLabTest(){
    this.navCtrl.push(EditlabtestPage);
  }

  do(){

  }

}
