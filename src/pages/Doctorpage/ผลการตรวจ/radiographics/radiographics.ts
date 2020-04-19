import { FilePath } from '@ionic-native/file-path';
import { stringify } from '@angular/core/src/util';
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

@IonicPage()
@Component({
  selector: 'page-radiographics',
  templateUrl: 'radiographics.html',
})
export class RadiographicsPage {

  formgroup: FormGroup;
  myPhoto: any;
  HashID: any;
  Date: string;
  PersonID: string = this.global.getpatientID();
  description : string = "";
  round: any = this.global.getSelectRound();
  Time: any;
  data:any;

  imageFile: any;
  imageLink:any;
  desc: any;
  showMenu: boolean;
  ContentType = "image/jpeg";
  folderpath = this.file.externalRootDirectory;
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
    private filePath: FilePath
    ) {
      if(this.global.getSelectRole() === "หมอ"){
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
    let loader = this.loadingCtrl.create({
      content: "กำลังอัพโหลดรูปภาพ..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    this.round = this.global.getSelectRound();
    this.Date = moment().format('DD-MM-YYYY').toString();
    this.Time = moment().format('h-mm-ss').toString();
    this.HashID = Md5.hashStr('this.global.getpatientID()').toString();
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName:  this.HashID + "_r" + this.round + "_" + this.Date + "_" + this.Time + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {},
    }

    fileTransfer.upload(this.myPhoto, "http://" + this.global.getIP() + "/upload.php", options)
      .then((data) => {
      alert("การอัพโหลดรูปเสร็จสมบูรณ์");
      this.imageLink = data.response;
      this.updateData();
      console.log(data);
      console.log(this.imageLink);
      loader.dismiss();
    }, (err) => {
      alert(JSON.stringify(err));
      loader.dismiss();
    });
  }

  updateData(){
      let headers = new Headers({ "Content-type": "application/json" });
      let options = new RequestOptions({ headers: headers });
      let body = {
        idcard: this.PersonID,
        round: this.round,
        thy_scan_image: this.imageLink,
        thy_scan_desc: this.description
      };
      console.log(JSON.stringify(body));
      this.http.post("http://" + this.global.getIP() + "/result.php?method=update_thyroidScan&role=" + this.global.getSelectRole(),
          body,
          options
        )
        .map(res => res.json())
        .subscribe(
          data => {
            console.log(JSON.stringify(data));
          },
          error => {
            console.log(error);
          }
        );
    }

  async getData(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound()
    });
    console.log("body : " + body);
    await this.http.post("http://" + this.global.getIP() + "/result.php?method=get_thyroidScan&role=" + this.global.getSelectRole()
    ,body
    ,options
    )
    .map(res=>res.json())
    .subscribe(
      data => {
        this.imageFile = "http://" + this.global.getIP() + "/" + data.thy_scan_image;
        this.desc = data.thy_scan_desc;
        console.log(data);
      }, error => {
        console.log(error);
      }
    )
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
