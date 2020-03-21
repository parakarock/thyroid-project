import { DocPhysicalsPage } from '../doc-physicals/doc-physicals';
import { DocEditphysicalPage } from '../doc-editphysical/doc-editphysical';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DocPhysicalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doc-physical',
  templateUrl: 'doc-physical.html',
})
export class DocPhysicalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhysicalPage');
  }

  physicals(){
    this.navCtrl.push(DocPhysicalsPage);
  }
  editphysical(){
    this.navCtrl.push(DocEditphysicalPage);
  }


}


