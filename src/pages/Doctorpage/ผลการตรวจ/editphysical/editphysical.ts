import { FileChooser } from '@ionic-native/file-chooser';
import { FileOpener } from '@ionic-native/file-opener';
import { FilePath } from '@ionic-native/file-path';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CameraOptions, Camera } from '@ionic-native/camera';

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
  myPhoto: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private filePath: FilePath,
              private fileOpener: FileOpener,
              private fileChooser: FileChooser,
              public alertController: AlertController,
              private camera: Camera,
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditphysicalPage');
  }

  AlertTakePhoto(){
    let alert = this.alertController.create({
      title: "โปรดเลือกวิธีการอัพโหลดรูป",
      buttons: [
        {
        text: "เลือกจากคลังรูปภาพ",
        handler: () => {
          this.takePhoto(0);
          }
        },
        {
          text: "ถ่ายรูปจากกล้อง",
        handler: () => {
          this.takePhoto(1);
          }
        }
      ]
    });
    alert.present();
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
    this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      alert("กรุณาอัพโหลดรูปผ่านแอพลิเคชั่นบนมือถือ");
    });
  }

}
