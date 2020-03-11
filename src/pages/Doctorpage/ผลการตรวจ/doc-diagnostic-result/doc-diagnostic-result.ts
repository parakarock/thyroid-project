import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DocDiagnosticResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doc-diagnostic-result',
  templateUrl: 'doc-diagnostic-result.html',
})
export class DocDiagnosticResultPage {
  a:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiagnosticResultsPage');
  }
  // do(){
  //   this.aaa = this.aaa;
  // }


}
