import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';


@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {
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
