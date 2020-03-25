import { FileChooser } from '@ionic-native/file-chooser';
import { FileOpener } from '@ionic-native/file-opener';
import { FilePath } from '@ionic-native/file-path';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditphysicalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editphysical',
  templateUrl: 'editphysical.html',
})
export class EditphysicalPage {
  urls = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private filePath: FilePath,
              private fileOpener: FileOpener,
              private fileChooser: FileChooser
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditphysicalPage');
  }

  onSelectFile(event){
    // if (event.target.files && event.target.files[0]) {
    //   var reader = new FileReader();

    //   reader.readAsDataURL(event.target.files[0]); // read file as data url

    //   reader.onload = (event) => { // called once readAsDataURL is completed
    //     this.urls = event.target.result;
    //   }
    // }
  }

}
