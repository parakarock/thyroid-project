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
    this.dateBefore = moment(this.global.getdate(),"YYYY-MM-DD").subtract(7, "days").format("Do MMMM YYYY");
    if(this.navParams.get('method') == "วิธีคำนวณ"){
      this.dateAfter = moment(this.global.getdate(),"YYYY-MM-DD").add(5, 'days').format("Do MMMM YYYY");
    }else{
      this.dateAfter = moment(this.global.getdate(),"YYYY-MM-DD").add(4, 'days').format("Do MMMM YYYY");
    }
    console.log(this.navParams.get('method')+this.dateAfter)
    
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
