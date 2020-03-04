import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditantidepressantPage } from '../editantidepressant/editantidepressant';
import { GlobalProvider } from "../../../../providers/global/global";
import moment from 'moment';
import 'moment/locale/TH';

/**
 * Generated class for the AntidepressantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-antidepressant',
  templateUrl: 'antidepressant.html',
})
export class AntidepressantPage {
  dateBefore;
  dateAfter;
  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AntidepressantPage');
   this.dateBefore = moment(this.global.mydate,"YYYY-MM-DD").subtract(3, 'days').format("Do MMMM YYYY");
   this.dateAfter = moment(this.global.mydate,"YYYY-MM-DD").add(4, 'days').format("Do MMMM YYYY");
  }

  editantidepressant(){
    this.navCtrl.push(EditantidepressantPage)
  }

 
}
