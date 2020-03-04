import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContraceptivePage } from '../contraceptive/contraceptive';
import { AntidepressantPage } from '../antidepressant/antidepressant';
import { AvoideatingPage } from '../avoideating/avoideating';
import { PracticePage } from '../practice/practice';
import { DataswallowPage } from '../dataswallow/dataswallow';
import { EditdatePage } from '../editdate/editdate';
import { GlobalProvider } from "../../../../providers/global/global";
/**
 * Generated class for the PreparehomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preparehome',
  templateUrl: 'preparehome.html',
})
export class PreparehomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreparehomePage');
  }
  contraceptive(){
    this.navCtrl.push(ContraceptivePage)
  }
  antidepressant(){
    this.navCtrl.push(AntidepressantPage)
  }
  avoideating(){
    this.navCtrl.push(AvoideatingPage)
  }
  practice(){
    this.navCtrl.push(PracticePage)
  }
  dataswallow(){
    this.navCtrl.push(DataswallowPage)
  }
  editdate(){
    this.navCtrl.push(EditdatePage)
  }
 
 
}
