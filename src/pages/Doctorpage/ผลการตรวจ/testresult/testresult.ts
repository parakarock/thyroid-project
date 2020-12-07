import { LabtestresultPage } from './../../../Nursepage/ผลการตรวจทางห้องแลป/labtestresult/labtestresult';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhysicalPage } from '../physical/physical';
import { BiopsyPage } from '../biopsy/biopsy';
import { LabPage } from '../lab/lab';
import { RadiographicPage } from '../radiographic/radiographic';


/**
 * Generated class for the TestresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-testresult',
  templateUrl: 'testresult.html',
})
export class TestresultPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestresultPage');
  }

  physical(){
    this.navCtrl.push(PhysicalPage)
  }
  lab(){
    this.navCtrl.push(LabtestresultPage)
  }
  radiographic(){
    this.navCtrl.push(RadiographicPage)
  }
  biopsy(){
    this.navCtrl.push(BiopsyPage)
  }

}
