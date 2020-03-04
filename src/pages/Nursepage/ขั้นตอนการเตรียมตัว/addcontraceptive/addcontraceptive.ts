import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddcontraceptivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcontraceptive',
  templateUrl: 'addcontraceptive.html',
})
export class AddcontraceptivePage {
  patient:String;
  contraceptive:String;
  monthyear:String;
  myDate:String;
  number:String;
 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcontraceptivePage');
  }
 do(){
    let body = JSON.stringify({
     
      patient: this.patient,
      contraceptive: this.contraceptive,
      monthyear: this.monthyear,
      myDate: this.myDate,
      number: this.number
     
    });
  }
}
