import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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


  title:string;
  fname:string;
  lname:string;
  myDate:string;
  idcard:string;
  gender:string;
  national:string;
  status:string;
  input:string;
  hninput:string;
  hnbuu:string;
  output:string;
  hnoutput:string;
  tel:string;
  


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditgeneralPage');
  }

  do(){
    let body = JSON.stringify({
     
      title: this.title,
      fname: this.fname,
      lname: this.lname,
      myDate: this.myDate,
      idcard: this.idcard,
      gender: this.gender,
      national: this.national,
      status: this.status,
      input: this.input,
      hninput: this.hninput,
      hnbuu: this.hnbuu,
      output: this.output,
      hnoutput: this.hnoutput,
      tel: this.tel
    });
  }
}
