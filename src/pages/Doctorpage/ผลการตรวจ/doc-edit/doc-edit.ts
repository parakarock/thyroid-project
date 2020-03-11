import { DocExaminationPage } from '../doc-examination/doc-examination';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DocEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doc-edit',
  templateUrl: 'doc-edit.html',
})
export class DocEditPage {
  order:String;
  myDate:String;
  result:String;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }
  do(){
    let body = JSON.stringify({

      order: this.order,
      myDate: this.myDate,
      result: this.result

    });
  }


}
