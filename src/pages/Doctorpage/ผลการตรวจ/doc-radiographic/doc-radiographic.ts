import { DocExaminationPage } from './../doc-examination/doc-examination';
import { DocRadiographicsPage } from '../doc-radiographics/doc-radiographics';
import { DocEditPage } from '../doc-edit/doc-edit';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DocRadiographicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doc-radiographic',
  templateUrl: 'doc-radiographic.html',
})
export class DocRadiographicPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RadiographicPage');
  }

  edit(){
    this.navCtrl.push(DocEditPage)
  }
  radiographic(){
    this.navCtrl.push(DocRadiographicsPage)
  }
  
  thyroidUltrasound(){
    this.navCtrl.push(DocExaminationPage)
  }
}

