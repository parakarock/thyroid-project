import { EditlabtestPage } from '../editlabtest/editlabtest';
import { AddlabtestPage } from './../addlabtest/addlabtest';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

}
