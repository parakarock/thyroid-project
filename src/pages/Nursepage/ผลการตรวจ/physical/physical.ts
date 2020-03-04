import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhysicalsPage } from '../physicals/physicals';
import { EditphysicalPage } from '../editphysical/editphysical';

/**
 * Generated class for the PhysicalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-physical',
  templateUrl: 'physical.html',
})
export class PhysicalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhysicalPage');
  }

  physicals(){
    this.navCtrl.push(PhysicalsPage);
  }
  editphysical(){
    this.navCtrl.push(EditphysicalPage);
  }

}
