import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditphysicalsPage } from '../editphysicals/editphysicals';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhysicalsPage');
  }

  editphysicals(){
    this.navCtrl.push(EditphysicalsPage);
  }
}
