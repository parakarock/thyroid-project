import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditTabooPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-taboo',
  templateUrl: 'edit-taboo.html',
})
export class EditTabooPage {
// a:boolean=false;
// b:boolean=false;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditTabooPage');
  }
  // do() {
  //   if(this.a = true) {
  //   this.b = false
  // }
  //  if(this.a != true) {
  //   this.a = false
  // }
// } 

}
