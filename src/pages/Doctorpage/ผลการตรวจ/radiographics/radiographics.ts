import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
/**
 * Generated class for the RadiographicsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-radiographics',
  templateUrl: 'radiographics.html',
})
export class RadiographicsPage {

  // imageURI:any;
  // imageFileName:any;

  myPhoto: any;
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
    console.log('ionViewDidLoad RadiographicsPage');
  }

  // openGallery(){
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     saveToPhotoAlbum: false
  //   }

  //   this.camera.getPicture(options).then((imageData) => {
  //   // this.myPhoto = 'data:image/jpeg,' + imageData;
  //   this.myPhoto = imageData;
  //   }, (err) => {
  //     alert("Error getPicture:" + err);
  //     // this.presentToast(err);
  //   });
  // }

  // openCamera(){
  //   const options: CameraOptions = {
  //     quality: 70,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }

  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64:
  //     this.myPhoto = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     alert("Error openCamera : " + err);
  //   });
  // }

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
    this.myPhoto = 'data:image/jpeg;base64,' + imageData;
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
      fileName: "myImage_" + random + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload(this.myPhoto, 'http://192.168.31.190:8000/upload.php', options)
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

  // presentToast(msg) {
  //   let toast = this.toastCtrl.create({
  //     message: msg,
  //     duration: 3000,
  //     position: 'bottom'
  //   });

  //   toast.onDidDismiss(() => {
  //     console.log('Dismissed toast');
  //   });

  //   toast.present();
  // }

}
