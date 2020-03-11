import { EditiodineresultdetailPage } from '../editiodineresultdetail/editiodineresultdetail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IodineresultdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-iodineresultdetail',
  templateUrl: 'iodineresultdetail.html',
})
export class IodineresultdetailPage {

  public obj:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.obj =[
      {
        thysize: 12,
        TT3orfT3: 25.5,
        fT4: 50,
        TSH: 20.5,
        thyMed: "Propylthiouracil (PTU)",
        betaBlock: "Atenolol (50)"
      }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IodineresultdetailPage');
  }

  EditResultDetail(){
    this.navCtrl.push(EditiodineresultdetailPage);
  }

}
