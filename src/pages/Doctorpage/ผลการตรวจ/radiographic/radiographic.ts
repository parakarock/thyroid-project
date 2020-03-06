import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EditPage } from '../edit/edit';
import { RadiographicsPage } from '../radiographics/radiographics';

/**
 * Generated class for the RadiographicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-radiographic',
  templateUrl: 'radiographic.html',
})
export class RadiographicPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RadiographicPage');
  }

  edit(){
    this.navCtrl.push(EditPage)
  }
  radiographic(){
    this.navCtrl.push(RadiographicsPage)
  }
}
