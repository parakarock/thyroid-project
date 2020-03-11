import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditavoideatingPage } from '../editavoideating/editavoideating';
import { EatfoodPage } from '../eatfood/eatfood';
import { NofoodPage } from '../nofood/nofood';


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
  constructor(public navCtrl: NavController, public navParams: NavParams )  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvoideatingPage');
  
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
