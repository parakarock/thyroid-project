import { Http,
  Response,
  Headers,
  ResponseOptions,
  RequestOptions} from '@angular/http';
import * as moment from "moment";

import { GlobalProvider } from './../../../../providers/global/global';
import { Md5 } from 'ts-md5/dist/md5';
// import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

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
  formgroup: FormGroup;
  myPhoto: any;
  HashID: any;
  Date: string;
  PersonID: string;
  description : string = "";
  round: any;
  Time: any;
  data:any;

  imageFile: any;
  imageLink:any;
  desc: any;
  showMenu: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private transfer: FileTransfer,
    public http: Http,
    private file: File,
    private Md5: Md5,
    public global: GlobalProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    ) {
      if(this.global.getSelectRole() === "doctor"){
        this.showMenu = true;
      }else{
        this.showMenu = false;
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RadiographicsPage');
    this.getData()
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
    this.round = this.global.selectRound;
    this.Date = moment().format('DD_MM_YYYY');
    this.Time = moment().format('h_mm_ss');
    this.HashID = Md5.hashStr('this.global.getpatientID()');
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName:  this.HashID + "_r" + this.round + "_" + this.Date + "_" + this.Time + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "multipart/form-data",
      headers: {},
      params: {
        description: this.description
      }
    }

    fileTransfer.upload(this.myPhoto, 'http://192.168.31.98:8000/upload.php', options)
      .then((data) => {
      alert("การอัพโหลดรูปเสร็จสมบูรณ์");
      // this.updateData();
      loader.dismiss();
      // console.log(data + " Uploaded Successfully");
      // this.myPhoto = "http://10.80.82.229:8000/Images/ionicfile.jpg"
      //this.presentToast("Image uploaded successfully");
    }, (err) => {
      // console.log(err);
      // this.presentToast(JSON.stringify(err));
      // alert("เกิดข้อผิดพลาดในการอัพโหลด กรุณาทำรายการใหม่อีกครั้ง");
      alert(JSON.stringify(err));
      loader.dismiss();
    });
  }

  getData(){
    this.http.get("http://192.168.31.98:8000/result.php?method=get_thyroidScan&role=patient")
    .map(res=>res.json())
    .subscribe(
      data => {
        this.imageFile = "http://" + this.global.getIP() + data.thy_scan_image;
        this.desc = data.thy_scan_desc;
        console.log(data);
      }, error => {
        console.log(error);
      }
    )
  }

  transformImageLink(){

  }

  // updateData(){
  //   let headers = new Headers({ "Content-type": "application/json" });
  //   let options = new RequestOptions({ headers: headers });
  //   let body = {
  //     idcard: this.PersonID,
  //     round: this.round,
  //     thy_scan_image: this.myPhoto,
  //     thy_scan_desc: this.description
  //   };

  //   console.log("body : " + body);
  //   this.http
  //     .post(
  //       "http://192.168.31.98:8000/result.php?method=update_thyroidScan&role=doctor",
  //       body,
  //       options
  //     )
  //     .map(res => res.json())
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }

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
