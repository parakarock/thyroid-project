import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditavoideatingPage } from '../editavoideating/editavoideating';
import { EatfoodPage } from '../eatfood/eatfood';
import { NofoodPage } from '../nofood/nofood';
import { GlobalProvider } from "../../../../providers/global/global";
import moment from 'moment';
import 'moment/locale/TH';
/**
 * Generated class for the AvoideatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avoideating',
  templateUrl: 'avoideating.html',
})
export class AvoideatingPage {
  dateBefore;
  dateAfter;
  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalProvider )  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvoideatingPage');
    this.dateBefore = moment(this.global.mydate,"YYYY-MM-DD").format("Do MMMM YYYY");
    this.dateAfter = moment(this.global.mydate,"YYYY-MM-DD").add(11, 'days').format("Do MMMM YYYY");
  }

  editavoideating(){
    this.navCtrl.push(EditavoideatingPage)
  }
  nofood(){
    this.navCtrl.push(NofoodPage)
  }
  eatfood(){
    this.navCtrl.push(EatfoodPage)
  }
}
