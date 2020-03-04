import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditantidepressantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editantidepressant',
  templateUrl: 'editantidepressant.html',
})
export class EditantidepressantPage {

  AbstainFromMedication:String;
  myDate:String;
  AfterIngestion:String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditantidepressantPage');
  }
 do(){
    let body = JSON.stringify({
     
      AbstainFromMedication: this.AbstainFromMedication,
      myDate: this.myDate,
      AfterIngestion:this.AfterIngestion
    });
  }
}
