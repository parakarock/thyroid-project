import { DocBiopsyPage } from '../doc-biopsy/doc-biopsy';
import { DocRadiographicPage } from '../doc-radiographic/doc-radiographic';
import { DocLabPage } from '../doc-lab/doc-lab';
import { DocPhysicalPage } from '../doc-physical/doc-physical';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DocTestresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doc-testresult',
  templateUrl: 'doc-testresult.html',
})
export class DocTestresultPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestresultPage');
  }

  physical(){
    this.navCtrl.push(DocPhysicalPage)
  }
  lab(){
    this.navCtrl.push(DocLabPage)
  }
  radiographic(){
    this.navCtrl.push(DocRadiographicPage)
  }
  biopsy(){
    this.navCtrl.push(DocBiopsyPage)
  }

}


