import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../../../providers/global/global";
import moment from 'moment';
import 'moment/locale/TH';


/**
 * Generated class for the EditdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editdate',
  templateUrl: 'editdate.html',
})
export class EditdatePage {
  howto:String;
  inDate:String;
  toDate:String;
  currentDate;
  mydate;

  @ViewChild("Date") date;
  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalProvider) {

  }
 
  ionViewDidLoad() {
   // this.date.push(moment().format('dddd'));
    console.log('ionViewDidLoad EditdatePage');
   
  }
  datadate() {
    this.currentDate = moment(this.mydate,"YYYY-MM-DD").add(1, 'days').calendar();
    
  }
  do(){
    let body = JSON.stringify({
     
      howto: this.howto,
      inDate: this.inDate,
      toDate: this.toDate 
     
    });
  }
}
