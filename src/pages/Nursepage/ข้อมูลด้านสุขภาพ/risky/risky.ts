import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditriskyPage } from '../editrisky/editrisky';

/**
 * Generated class for the RiskyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-risky',
  templateUrl: 'risky.html',
})
export class RiskyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RiskyPage');
  }

  editrisky(){
    this.navCtrl.push(EditriskyPage)
  }
}
