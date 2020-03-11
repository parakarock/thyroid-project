import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddcontraceptivePage } from '../addcontraceptive/addcontraceptive';

/**
 * Generated class for the EditcontraceptivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editcontraceptive',
  templateUrl: 'editcontraceptive.html',
})
export class EditcontraceptivePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditcontraceptivePage');
  }

  addcontraceptive(){
    this.navCtrl.push(AddcontraceptivePage)
  }
}
