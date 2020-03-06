import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditbiopsyPage } from '../editbiopsy/editbiopsy';
import { DiagnosticResultsPage } from '../diagnostic-results/diagnostic-results';

/**
 * Generated class for the BiopsyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-biopsy',
  templateUrl: 'biopsy.html',
})
export class BiopsyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BiopsyPage');
  }

  
  editbiopsy(){
    this.navCtrl.push(EditbiopsyPage);
  }

  DiagnosticResultsPage(){
    this.navCtrl.push(DiagnosticResultsPage);
  }
}
