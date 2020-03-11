import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditcontraceptivePage } from '../editcontraceptive/editcontraceptive';

/**
 * Generated class for the ContraceptivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contraceptive',
  templateUrl: 'contraceptive.html',
  
})
export class ContraceptivePage {
  Date:string;
  moment: Date;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContraceptivePage');
  }

  editcontraceptive(){
    this.navCtrl.push(EditcontraceptivePage)
  }

}
