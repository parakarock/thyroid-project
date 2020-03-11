import { DocDiagnosticResultPage } from '../doc-diagnostic-result/doc-diagnostic-result';
import { DocEditbiopsyPage } from '../doc-editbiopsy/doc-editbiopsy';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DocBiopsyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doc-biopsy',
  templateUrl: 'doc-biopsy.html',
})
export class DocBiopsyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BiopsyPage');
  }


  editbiopsy(){
    this.navCtrl.push(DocEditbiopsyPage);
  }

  DiagnosticResultsPage(){
    this.navCtrl.push(DocDiagnosticResultPage);
  }
}

