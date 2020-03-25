import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
/**
 * Generated class for the AgreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agree',
  templateUrl: 'agree.html',
})
export class AgreePage {

  myContract:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private transfer: FileTransfer,
    // public http: HttpClient,
    private file: File
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgreePage');
  }

  takePhoto(SourceType:number){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: SourceType,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myContract = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      alert("กรุณาอัพโหลดรูปผ่านแอพลิเคชั่นบนมือถือ");
    });
  }

  uploadFile(){
    // let url = "http://localhost:8000/upload.php";
    // let postData = new FormData();
    // postData.append('file', this.myPhoto);
    // let data:Observable<any> = this.http.post(url, postData);
    // data.subscribe((result) => {
    //   alert(result);
    // })
    let loader = this.loadingCtrl.create({
      content: "กำลังอัพโหลดรูปภาพ..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    var random = Math.floor(Math.random() * 1000);

    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: "myContract_" + random + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload(this.myContract, 'http://192.168.31.190:8000/uploadContract.php', options)
      .then((data) => {
      alert("การอัพโหลดรูปเสร็จสมบูรณ์");
      // console.log(data + " Uploaded Successfully");
      //this.myPhoto = "http://10.80.82.229:8000/Images/ionicfile.jpg"
      loader.dismiss();
      //this.presentToast("Image uploaded successfully");
    }, (err) => {
      // console.log(err);
      // this.presentToast(JSON.stringify(err));
      alert("เกิดข้อผิดพลาดในการอัพโหลด กรุณาทำรายการใหม่อีกครั้ง");
      loader.dismiss();
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
