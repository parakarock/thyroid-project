import { Http, Headers, RequestOptions } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
import { GlobalProvider } from './../../../../providers/global/global';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from "moment";
import { LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
    // public http: HttpClient,
    private file: File,
    public http: Http,
    private Md5: Md5,
    public global: GlobalProvider,
    public formBuilder: FormBuilder,
    ) {
      if(this.global.getSelectRole() === "ผู้ป่วย"){
        this.showMenu = true;
      }else{
        this.showMenu = false;
      }
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
      fileName: this.HashID + "_r" + this.round + "_" + this.Date + "_" + this.Time + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload(this.myContract, "http://" + this.global.getIP() + "/uploadContract.php", options)
      .then((data) => {
      alert("การอัพโหลดรูปเสร็จสมบูรณ์");
      this.imageLink = data.response; //เอา File Path มาใส่ในตัวแปร
      this.updateData();
      console.log(data);
      console.log(this.imageLink);
      loader.dismiss();
      //this.presentToast("Image uploaded successfully");
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
      acceptionform: this.imageLink,
    };
    console.log(JSON.stringify(body));
    this.http.post("http://" + this.global.getIP() + "/acceptionform.php?method=update_acceptionform&role=" + this.global.getSelectRole(),
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
    await this.http.post("http://" + this.global.getIP() + "/acceptionform.php?method=get_acceptionform&role=" + this.global.getSelectRole()
    ,body
    ,options
    )
    .map(res=>res.json())
    .subscribe(
      data => {
        this.imageFile = "http://" + this.global.getIP() + "/" + data.acceptionform;
        console.log(data);
      }, error => {
        console.log(error);
      }
    )
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
