import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { FileChooser } from '@ionic-native/file-chooser';
// import { FileOpener } from '@ionic-native/file-opener';
// import { FilePath } from '@ionic-native/file-path';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { RequestOptions, Http, Headers } from '@angular/http';
import { GlobalProvider } from '../../../../providers/global/global';
import moment from 'moment';
import 'moment/locale/TH';
import { Md5 } from 'ts-md5/dist/md5';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
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
  formgroup: FormGroup;
  round: any = this.global.getSelectRound();
  PersonID: string = this.global.getpatientID();
  Time: any;
  data:any;
  HashID: any;
  Date: string;
  ImageName: string;
  imageLink: any;
  startMin: any;
  startMax: any;
  presentDate: any;
  presentDate2: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertController: AlertController,
              public loadingCtrl: LoadingController,
              private camera: Camera,
              private transfer: FileTransfer,
              public http: Http,
              public global: GlobalProvider,
              // private Md5: Md5,
              public formBuilder: FormBuilder,
              //public alertCtrl: AlertController,
              ) {
                this.startMin = moment().add(443, 'y').format("YYYY");
                this.startMax = moment().add(543, 'y').format("YYYY");
                this.presentDate = moment().add(543, 'y').toISOString(); //เก็บค่าเวลาปัจจุบัน
                this.presentDate2 = moment().add(543, 'y').toISOString(); //เก็บค่าเวลาปัจจุบัน
                this.formgroup = formBuilder.group({
                  check_date: ['',],
                  sweat: ['',],
                  hair_loss: ['',],
                  body_weight: ['',],
                  heart_rate: ['',],
                  blood_pressure_upper: ['',],
                  blood_pressure_lower: ['',],
                  eye_detect: ['',],
                  eye_result: ['',],
                  doctor_name: ['',],
                  doctor_date: ['',],
                  doctor_result: ['',],
                  treatment: ['',]
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditphysicalPage');
  }

  setEyeResult(){
    let eye_test:any = this.formgroup.controls.eye_detect.value
    if(eye_test === 1){
      return this.formgroup.controls.eye_result.value
    } else {
      return this.formgroup.controls.eye_result.setValue(null)
    }
  }

  AlertTakePhoto(){ //ป๊อปอัพให้เลือกที่มาของรูปภาพ
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

  uploadFile(){ //อัพโหลดไฟล์รูปภาพไปยังโฟลเดอร์ EyeImages
    let loader = this.loadingCtrl.create({
      content: "กำลังอัพโหลดรูปภาพ..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    this.round = this.global.getSelectRound();
    this.Date = moment().format('DD_MM_YYYY').toString();
    this.Time = moment().format('h_mm_ss').toString();
    this.HashID = Md5.hashStr('this.global.getpatientID()').toString();
    this.ImageName = this.HashID + "_r" + this.round + "_" + this.Date + "_" + this.Time + ".jpg"; //ชื่อไฟล์รูปภาพ
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName:  this.ImageName,
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {},
    }

    fileTransfer.upload(this.myPhoto, 'http://' + this.global.getIP() + '/uploadEyeImage.php', options)
      .then((data) => {
        // alert("การอัพโหลดรูปเสร็จสมบูรณ์");
        this.imageLink = data.response; //เอา File Path มาใส่ในตัวแปร
        this.updateData();
        console.log(data);
        console.log(this.imageLink);
        loader.dismiss();
    }, (err) => {
        alert(JSON.stringify(err));
        loader.dismiss();
    });
  }

  async updateData(){ //บันทึกข้อมูลจากฟอร์มไปยัง Database
      let headers = new Headers({ "Content-type": "application/json" });
      let options = new RequestOptions({ headers: headers });
      let body = {
        idcard:  this.PersonID,
        round: this.round,
        check_date: moment(this.formgroup.controls.check_date.value).format("YYYY-MM-DD").toString(),
        sweat: this.formgroup.controls.sweat.value,
        hair_loss: this.formgroup.controls.hair_loss.value,
        body_weight: this.formgroup.controls.body_weight.value,
        heart_rate: this.formgroup.controls.heart_rate.value,
        blood_pressure_upper: this.formgroup.controls.blood_pressure_upper.value,
        blood_pressure_lower: this.formgroup.controls.blood_pressure_lower.value,
        eye_detect: this.formgroup.controls.eye_detect.value,
        eye_result : this.setEyeResult(),
        doctor_name: this.formgroup.controls.doctor_name.value,
        doctor_date: moment(this.formgroup.controls.doctor_date.value).format("YYYY-MM-DD").toString(),
        doctor_file: this.imageLink,
        doctor_result : this.formgroup.controls.doctor_result.value,
        treatment: this.formgroup.controls.treatment.value
      };
      console.log(body);
      await this.http.post("http://" + this.global.getIP() + "/result.php?method=update_bodyresult1&role=" + this.global.getSelectRole()
      ,body
      ,options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if(data.result){
            this.presentAlert(data.result);
            this.navCtrl.pop()
          }
        }, error => {
          console.log(error);
        }
      )
    }

  async presentConfirm() { //แสดงป๊อปอัพยืนยักการบันทึกข้อมูล
      let alert = await this.alertController.create({
        title: "ยืนยันการอัพเดทข้อมูล",
        message: "คุณต้องการดำเนินการต่อหรือไม่",
        buttons: [
          {
            text: "ยกเลิก",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            }
          },
          {
            text: "ตกลง",
            handler: () => {
              this.uploadFile()
            }
          }
        ]
      });
      alert.present();
    }

  doUpdate() {
      console.log(this.formgroup.value);
    }

  async presentAlert(txt: string) { //แสดงสถานะหลังจากทำการอัพโหลดข้อมูล
    let alert = await this.alertController.create({
      title: 'แจ้งเตือน',
      subTitle: txt,
      buttons: ['Ok']
    });
    alert.present();
  }

}
