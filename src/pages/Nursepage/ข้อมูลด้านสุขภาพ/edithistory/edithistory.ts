import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';

/**
 * Generated class for the EdithistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edithistory',
  templateUrl: 'edithistory.html',
})
export class EdithistoryPage {

  specify:String;
  hospital:String;
  datemineral:String;
  amount:String;
  
  
  
 
 
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EdithistoryPage');
  }

  do(){
    let body = JSON.stringify({
     
      specify: this.specify,
      hospital: this.hospital,
      datemineral: this.datemineral,
      amount: this.amount
     
    });
  }


}
