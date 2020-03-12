import { EditlabtestPage } from '../editlabtest/editlabtest';
import { AddlabtestPage } from '../addlabtest/addlabtest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LabtestresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-labtestresult',
  templateUrl: 'labtestresult.html',
})
export class LabtestresultPage {
  
  public obj:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.obj = [
      {
        date : "12 ธันวาคม 2563",
        freeT3: 25.5,
        freeT4: 50,
        TSH: 20.5,
        TRAb: 40,
        Medicine: "Propylthiouracil (PTU)",
      },
      {
        date : "11 พฤศจิกายน 2563",
        freeT3: 34.5,
        freeT4: 80,
        TSH: 27.5,
        TRAb: 58,
        Medicine: "Methimazole (MMI)",
      }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabtestresultPage');
  }

  onClickAddLabTest(){
    this.navCtrl.push(AddlabtestPage);
  }

  onClickEditLabTest(){
    this.navCtrl.push(EditlabtestPage);
  }

  do(){

  }

}
