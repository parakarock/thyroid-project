import * as moment from "moment";
import { Headers, RequestOptions, Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditphysicalsPage } from '../editphysicals/editphysicals';
import { GlobalProvider } from '../../../../providers/global/global';

/**
 * Generated class for the PhysicalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-physicals',
  templateUrl: 'physicals.html',
})
export class PhysicalsPage {
  showMenu: boolean;
  showData: boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public global: GlobalProvider,
              public http: Http) {
    if(this.global.getSelectRole() === "doctor"){
      this.showMenu = true;
    }else{
      this.showMenu = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhysicalsPage');
  }

  editphysicals(){
    this.navCtrl.push(EditphysicalsPage);
  }


}
