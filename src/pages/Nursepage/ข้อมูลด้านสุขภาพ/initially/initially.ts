import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditinitiallyPage } from '../editinitially/editinitially';

/**
 * Generated class for the InitiallyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-initially',
  templateUrl: 'initially.html',
})
export class InitiallyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitiallyPage');
  }

  editinitially(){
    this.navCtrl.push(EditinitiallyPage)
  }
}
