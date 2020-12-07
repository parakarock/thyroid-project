import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { GlobalProvider } from '../../../../providers/global/global';
import moment from 'moment';
import 'moment/locale/TH';
import { RequestOptions, Http, Headers } from '@angular/http';
/**
 * Generated class for the EditphysicalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editphysicals',
  templateUrl: 'editphysicals.html',
})
export class EditphysicalsPage {
  formgroup: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController,
              public global: GlobalProvider,
              public http: Http,
              public loadingCtrl: LoadingController,
              public alertController: AlertController,
              )
            {

              this.formgroup = formBuilder.group({
                thyroid_size: ['',],
                thyroid_tumor_detect: ['',],
                thyroid_tumor_size: ['',],
                heart_lung_unusual: ['',],
                heart_lung_detail: ['',],
                trembling_hand: ['',],
                power_left_hand: ['',],
                power_right_hand: ['',],
                power_left_leg: ['',],
                power_right_leg: ['',],
                swell_shin: ['',],
                brittle_nail: ['',],
                detail: ['',]
              });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditphysicalsPage');
  }

  doUpdate(){
    console.log(this.formgroup.value);
  }

  async updateData(){ //บันทึกข้อมูลจากฟอร์มไปยัง Database
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = {
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound(),
      thyroid_size: this.formgroup.controls.thyroid_size.value,
      thyroid_tumor_detect: this.formgroup.controls.thyroid_tumor_detect.value,
      thyroid_tumor_size: this.formgroup.controls.thyroid_tumor_size.value,
      heart_lung_unusual: this.formgroup.controls.heart_lung_unusual.value,
      heart_lung_detail: this.formgroup.controls.heart_lung_detail.value,
      trembling_hand: this.formgroup.controls.trembling_hand.value,
      power_left_hand: this.formgroup.controls.power_left_hand.value,
      power_right_hand: this.formgroup.controls.power_right_hand.value,
      power_left_leg: this.formgroup.controls.power_left_leg.value,
      power_right_leg: this.formgroup.controls.power_right_leg.value,
      swell_shin: this.formgroup.controls.swell_shin.value,
      brittle_nail: this.formgroup.controls.brittle_nail.value,
      detail: this.formgroup.controls.detail.value,
    };
    console.log(body);
    await this.http.post("https://" + this.global.getIP() + "/result.php?method=update_bodyresult2&role=" + this.global.getSelectRole()
    ,body
    ,options
    )
    .map(res=>res.json())
    .subscribe(
      data => {
        if(data.result){
         this.presentAlert(data.result);
        }
        console.log(JSON.stringify(data));
      }, error => {
        console.log(error);
      }
    )
  }

  async presentConfirm() { //แสดงป๊อปอัพยืนยักการบันทึกข้อมูล
    let alert = await this.alertCtrl.create({
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
            this.updateData();
            // this.navCtrl.getPrevious().data.formData = this.formgroup.value
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  async presentAlert(txt: string) { //แสดงสถานะหลังจากทำการอัพโหลดข้อมูล
    let alert = await this.alertCtrl.create({
      title: 'แจ้งเตือน',
      subTitle: txt,
      buttons: ['Ok']
    });
    alert.present();
  }
}
