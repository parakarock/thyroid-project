import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { Component, ViewChild, Renderer, Input } from '@angular/core';
import { NavController, Platform, normalizeURL, Content, ToastController, LoadingController } from 'ionic-angular';
import { File, IWriteOptions } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
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

  storedImages = [];

  @ViewChild(Content) content: Content;
  @ViewChild('fixedContainer') fixedContainer: any;

  selectedColor = '#f1a1b1';
  selectNum= 1;
  colors = [ '#f1a1b1', '#0cf514', '#0c7df5', '#f2cf07', '#ee07f2'];

  constructor(public navCtrl: NavController,
              private file: File,
              /*private storage: Storage,*/
              public renderer: Renderer,
              public toastCtrl: ToastController,
              private transfer: FileTransfer,
              public loadingCtrl: LoadingController,
              private plt: Platform) {
  }

  ionViewDidEnter() {

    let itemHeight = this.fixedContainer.nativeElement.offsetHeight;
    let scroll = this.content.getScrollElement();

    itemHeight = Number.parseFloat(scroll.style.marginTop.replace("px", "")) + itemHeight;
    scroll.style.marginTop = itemHeight + 'px';
  }


  ionViewDidLoad() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    this.canvasElement.height = 300  ;
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

  // saveCanvasImage() {
  //   var dataUrl = this.canvasElement.toDataURL();
  //   let ctx = this.canvasElement.getContext('2d');
  //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //   let name = new Date().getTime() + '.png';
  //   let path = this.file.dataDirectory;
  //   let options: IWriteOptions = { replace: true };
  //   var data = dataUrl.split(',')[1];
  //   let blob = this.b64toBlob(data, 'image/png');


  //   this.file.writeFile(path, name, blob, options).then(res => {


  //     alert(this.getImagePath(name));

  //   }, err => {
  //     alert('error: ' + err);
  //   });
  // }

  saveCanvasImage() {
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
      var random = Math.floor(Math.random() * 1000);
      let options: FileUploadOptions = {
            fileKey: 'photo',
            fileName: "myCanvas_" + random + ".jpg",
            chunkedMode: false,
            httpMethod: 'post',
            mimeType: "image/jpeg",
            headers: {}
          }
          fileTransfer.upload(this.filepath, 'http://192.168.31.190:8000/uploadCanvas.php', options)
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

      // alert(this.getImagePath(name));
    }, err => {
      alert('error: ' + err);
    });
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

  // uploadImage(){
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
//     alert(err);
//     loader.dismiss();
//   });
// }

  // presentToast(msg) {
  // let toast = this.toastCtrl.create({
  //   message: msg,
  //   duration: 3000,
  //   position: 'bottom'
  // });

  // toast.onDidDismiss(() => {
  //   console.log('Dismissed toast');
  // });

  // toast.present();
}

// }
