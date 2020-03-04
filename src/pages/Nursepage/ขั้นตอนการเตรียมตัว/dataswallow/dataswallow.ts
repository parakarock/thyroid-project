import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditdataswallowPage } from '../editdataswallow/editdataswallow';


/**
 * Generated class for the DataswallowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dataswallow',
  templateUrl: 'dataswallow.html',
})
export class DataswallowPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DataswallowPage');
  }

  editdataswallow(){
    this.navCtrl.push(EditdataswallowPage)
  }
}
