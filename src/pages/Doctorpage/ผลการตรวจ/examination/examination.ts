import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { Component, ViewChild, Renderer, Input } from '@angular/core';
import { NavController, Platform, normalizeURL, Content, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { File, IWriteOptions } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import * as moment from "moment";
import { GlobalProvider } from './../../../../providers/global/global';
import { Md5 } from 'ts-md5/dist/md5';
import { EditbiopsyPage } from '../editbiopsy/editbiopsy';
import { DiagnosticResultsPage } from '../diagnostic-results/diagnostic-results';
import { RequestOptions, Http, Headers } from '@angular/http';
/**
 * Generated class for the ExaminationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const STORAGE_KEY = 'IMAGE_LIST';
@Component({
  selector: 'page-examination',
  templateUrl: 'examination.html',
})
export class ExaminationPage {
  round: any = this.global.getSelectRound();
  Time: any;
  Date: string;
  HashID: any;

  @ViewChild('imageCanvas')
  canvas: any;
  canvasElement: any;
  filepath: any;
  lineSize = 1;
  lineheight = 5;
  linewidth = 200;
  Size = 6;
  saveX: number;
  saveY: number;
  n=1;
  public formgroup: FormGroup;
  storedImages = [];

  @ViewChild(Content) content: Content;
  @ViewChild('fixedContainer') fixedContainer: any;

  selectedColor = '#f1a1b1';
  selectNum= 1;
  colors = [ '#f1a1b1', '#0cf514', '#0c7df5', '#f2cf07', '#ee07f2'];
  formCount: any = 1;
  imageLink: any;

  constructor(public navCtrl: NavController,
              private file: File,
              /*private storage: Storage,*/
              public renderer: Renderer,
              public toastCtrl: ToastController,
              public alertController: AlertController,
              private transfer: FileTransfer,
              public loadingCtrl: LoadingController,
              private plt: Platform,
              private Md5: Md5,
              public global: GlobalProvider,
              public formBuilder: FormBuilder,
              public http: Http,
              ) {
                this.formgroup = formBuilder.group({
                  thy_num1: ['',],
                  thy_ult_date1: ['',],
                  thy_ult_advice1: ['',],
                  thy_ult_follow_num1: ['',],
                  thy_ult_follow_unit1: ['',],
                  thy_ult_fine_result1: ['',],
                  thy_ult_surgury_desc1: ['',],
                  thy_num2: ['',],
                  thy_ult_date2: ['',],
                  thy_ult_advice2: ['',],
                  thy_ult_follow_num2: ['',],
                  thy_ult_follow_unit2: ['',],
                  thy_ult_fine_result2: ['',],
                  thy_ult_surgury_desc2: ['',],
                  thy_num3: ['',],
                  thy_ult_date3: ['',],
                  thy_ult_advice3: ['',],
                  thy_ult_follow_num3: ['',],
                  thy_ult_follow_unit3: ['',],
                  thy_ult_fine_result3: ['',],
                  thy_ult_surgury_desc3: ['',],
                  thy_ult_result: ['',]
                });

  }

  ionViewDidEnter() {
    // let itemHeight = this.fixedContainer.nativeElement.offsetHeight;
    // let scroll = this.content.getScrollElement();
    // itemHeight = Number.parseFloat(scroll.style.marginTop.replace("px", "")) + itemHeight;
    // scroll.style.marginTop = itemHeight + 'px';
  }


  ionViewDidLoad() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    this.canvasElement.height = 200  ;

  }

  selectColor(color,i) {
    this.selectedColor = color;
    this.selectNum = i;
  }

  startDrawing(ev) {
    var canvasPosition = this.canvasElement.getBoundingClientRect();
    let x = ev.clientX - canvasPosition.x;
    let y = ev.clientY - canvasPosition.y;
    let num = this.selectNum;
    if(num <= 5) {
      let ctx = this.canvasElement.getContext("2d");
      ctx.beginPath();
      ctx.lineWidth = (this.Size*this.lineSize);
      ctx.arc(x, y,  this.lineSize*(this.n*3), 0, 2 * Math.PI, true,) ;
      ctx.strokeStyle = this.selectedColor;
      ctx.stroke();
      ctx.fillText(num, x, y);
      ctx.closePath();
      this.selectColor(this.colors[num], num+1);
    }
  }

  saveCanvasImage() {
    // console.log(this.formgroup.get("Detail").value);
    var dataUrl = this.canvasElement.toDataURL();
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let name = new Date().getTime() + '.png';
    let path = this.file.dataDirectory;
    let options: IWriteOptions = { replace: true };
    var data = dataUrl.split(',')[1];
    let blob = this.b64toBlob(data, 'image/png');
    let loader = this.loadingCtrl.create({ content: "กำลังอัพโหลดรูปภาพ..." }); loader.present();
    this.file.writeFile(path, name, blob, options).then(res => {
      this.filepath = this.getImagePath(name);
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
          fileTransfer.upload(this.filepath, "http://" + this.global.getIP() + "/uploadCanvas.php", options)
              .then((data) => {
              alert("บันทึกข้อมูลเสร็จสมบูรณ์");
              this.imageLink = data.response;
              this.updateData();

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

      // alert(this.getImagePath(name));
    }, err => {
      alert('error: ' + err);
    });
  }


  updateData(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = {
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound(),
      thyroid_image: this.imageLink,
      thy_ult_result: this.formgroup.controls.thy_ult_result.value
    };
    // console.log(body);
      this.http.post("http://" + this.global.getIP() + "/result.php?method=update_thyroidUltraPic&role=" + this.global.getSelectRole()
      ,body
      ,options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          this.updateForm1();
          console.log(JSON.stringify(data));
        }, error => {
          console.log(error);
        }
      )
  }

  updateForm1(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = {
    idcard: this.global.getpatientID(),
    round: this.global.getSelectRound(),
    thy_num: 1,
    thy_ult_date: moment(this.formgroup.controls.thy_ult_date1.value).format("YYYY-MM-DD"),
    thy_ult_advice: this.formgroup.controls.thy_ult_advice1.value,
    thy_ult_follow_num: this.formgroup.controls.thy_ult_follow_num1.value,
    thy_ult_follow_unit: this.formgroup.controls.thy_ult_follow_unit1.value,
    thy_ult_fine_result: this.formgroup.controls.thy_ult_fine_result1.value,
    thy_ult_surgury_desc: this.formgroup.controls.thy_ult_surgury_desc1.value,
    };
    console.log(body);
    this.http.post("http://" + this.global.getIP() + "/result.php?method=insert_thyroidUltraMass&role=" + this.global.getSelectRole()
    ,body
    ,options
    )
    .map(res => res.json())
    .subscribe(
      data => {
        this.updateForm2();
        console.log(JSON.stringify(data));
      }, error => {
        console.log(error);
      }
    )
  }

  updateForm2(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = {
    idcard: this.global.getpatientID(),
    round: this.global.getSelectRound(),
    thy_num: 2,
    thy_ult_date: moment(this.formgroup.controls.thy_ult_date2.value).format("YYYY-MM-DD"),
    thy_ult_advice: this.formgroup.controls.thy_ult_advice2.value,
    thy_ult_follow_num: this.formgroup.controls.thy_ult_follow_num2.value,
    thy_ult_follow_unit: this.formgroup.controls.thy_ult_follow_unit2.value,
    thy_ult_fine_result: this.formgroup.controls.thy_ult_fine_result2.value,
    thy_ult_surgury_desc: this.formgroup.controls.thy_ult_surgury_desc2.value,
    };
    console.log(body);
    this.http.post("http://" + this.global.getIP() + "/result.php?method=insert_thyroidUltraMass&role=" + this.global.getSelectRole()
    ,body
    ,options
    )
    .map(res => res.json())
    .subscribe(
      data => {
        this.updateForm3();
        console.log(JSON.stringify(data));
      }, error => {
        console.log(error);
      }
    )
  }

  updateForm3(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = {
    idcard: this.global.getpatientID(),
    round: this.global.getSelectRound(),
    thy_num: 3,
    thy_ult_date: moment(this.formgroup.controls.thy_ult_date3.value).format("YYYY-MM-DD"),
    thy_ult_advice: this.formgroup.controls.thy_ult_advice3.value,
    thy_ult_follow_num: this.formgroup.controls.thy_ult_follow_num3.value,
    thy_ult_follow_unit: this.formgroup.controls.thy_ult_follow_unit3.value,
    thy_ult_fine_result: this.formgroup.controls.thy_ult_fine_result3.value,
    thy_ult_surgury_desc: this.formgroup.controls.thy_ult_surgury_desc3.value,
    };
    console.log(body);
    this.http.post("http://" + this.global.getIP() + "/result.php?method=insert_thyroidUltraMass&role=" + this.global.getSelectRole()
    ,body
    ,options
    )
    .map(res => res.json())
    .subscribe(
      data => {
        if(data.result){
        // this.presentAlert(data.result);
        console.log(data.result);
        }
        console.log(JSON.stringify(data));
      }, error => {
        console.log(error);
      }
    )
  }

  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

    getImagePath(imageName) {
      let path = this.file.dataDirectory + imageName;
      path = normalizeURL(path);
      return path;
    }

      clearCanvas(){
        let ctx = this.canvasElement.getContext('2d');
        ctx.clearRect(1, 0, this.canvasElement.width, this.canvasElement.height);
    }

    // doUpdate() {
    //   console.log(this.formgroup.value);
    // }

//   uploadImage(){
//   let loader = this.loadingCtrl.create({
//     content: "กำลังอัพโหลดรูปภาพ..."
//   });
//   loader.present();
//   const fileTransfer: FileTransferObject = this.transfer.create();

//   var random = Math.floor(Math.random() * 1000);

//   let options: FileUploadOptions = {
//     fileKey: 'photo',
//     fileName: "myCanvas_" + random + ".jpg",
//     chunkedMode: false,
//     httpMethod: 'post',
//     mimeType: "image/jpeg",
//     headers: {}
//   }

//   fileTransfer.upload(imagepath, 'http://192.168.31.190:8000/uploadCanvas.php', options)
//     .then((data) => {
//     alert("การอัพโหลดรูปเสร็จสมบูรณ์");
//     // console.log(data + " Uploaded Successfully");
//     //this.myPhoto = "http://10.80.82.229:8000/Images/ionicfile.jpg"
//     loader.dismiss();
//     //this.presentToast("Image uploaded successfully");
//   }, (err) => {
//     // console.log(err);
//     // this.presentToast(JSON.stringify(err));
//     alert("เกิดข้อผิดพลาดในการอัพโหลด กรุณาทำรายการใหม่อีกครั้ง"+ JSON.stringify(err));
//     loader.dismiss();
//   });
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
 }
