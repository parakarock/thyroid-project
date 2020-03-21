import { DocEditphysicalsPage } from '../doc-editphysicals/doc-editphysicals';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DocPhysicalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doc-physicals',
  templateUrl: 'doc-physicals.html',
})
export class DocPhysicalsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhysicalsPage');
  }

  editphysicals(){
    this.navCtrl.push(DocEditphysicalsPage);
  }
}

