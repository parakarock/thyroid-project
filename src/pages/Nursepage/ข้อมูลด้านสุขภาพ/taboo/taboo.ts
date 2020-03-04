import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditTabooPage } from '../edit-taboo/edit-taboo';

/**
 * Generated class for the TabooPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-taboo',
  templateUrl: 'taboo.html',
})
export class TabooPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabooPage');
  }

  edittaboo(){
    this.navCtrl.push(EditTabooPage)
  }
}
