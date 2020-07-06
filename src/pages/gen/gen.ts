import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the GenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gen',
  templateUrl: 'gen.html',
})
export class GenPage {
  options: BarcodeScannerOptions;
  encodText:string="";
  encodeData:any={};
  scannedData:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,public scanner: BarcodeScanner) {
  }


  scan(){
    this.scanner.scan(this.options).then((data) => {
      console.log(data);
      this.scannedData = data;
      },(err)=> {
        console.log('Error :',err);
      })
    }
    
  encode(){
    this.scanner.encode(this.scanner.Encode.TEXT_TYPE, this.encodText).then((data) => {
      this.encodeData = data;
    },(err)=> {
      
      console.log('Error :',err);
    })

  }
    ionViewDidLoad() {
      console.log('ionViewDidLoad QrcodePage');
    }

}
