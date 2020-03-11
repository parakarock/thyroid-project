import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {

  options: BarcodeScannerOptions;
  encodText: string;
  encodeData:any={};
  scannedData:any={};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

  scan(){
    this.options = {
      prompt: "Please Scan Barcode"
    };
    this.barcodeScanner.scan(this.options).then((data) => {
      this.scannedData = data;
    }, (err) => {
      alert("Error :" + err)
    })
  }

  encode(){
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.encodText).then((data) => {
      this.encodeData = data;
    }, (err) => {
      alert("Error :" + err)
    })
  }

}


