import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import {
  Http,
  Headers,
  RequestOptions
} from "@angular/http";

/**
 * Generated class for the ChangepassLogin2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepass-login2',
  templateUrl: 'changepass-login2.html',
})
export class ChangepassLogin2Page {
  newPass ='';
  confirmPass ='';
  person_id;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: Http,public alertCtrl: AlertController,public global: GlobalProvider) {
    this.person_id = navParams.get("person_id")
  }

  pass2(){
    if(this.newPass === this.confirmPass){
      if(this.newPass === '' &&this.confirmPass === ''){
        this.presentAlert("เปลี่ยนรหัสผ่านไม่สำเร็จ","กรุณากรอกข้อมูลให้ครบ")
      }else{
        this.changePass()
      }
   
    }else{
      this.presentAlert("เปลี่ยนรหัสผ่านไม่สำเร็จ","กรุณากรอกรหัสผ่านให้ตรงกัน")
    }
  }

 async changePass(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = { person_id: this.person_id, newpass: this.confirmPass };
    console.log("body : " + JSON.stringify(body));
    await this.http
      .post(
        "http://"+this.global.getIP()+"/login.php?method=changePassLogin2&role=guest",
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if(data.username){
            this.presentAlert("รหัสผ่านใหม่","Username : "+data.username+"<br>"+"Password : "+data.password).then(()=>{
              this.navCtrl.remove(this.navCtrl.getActive().index - 1, 2);
            })
            
          }else{
            this.presentAlert("เกิดข้อผิดพลาด",data.result)
          }
          
        },
        error => {
          console.log(error);
        }
      );
  }


  async presentAlert(title:string,txt: string) {
    let alert = await this.alertCtrl.create({
      title: title,
      subTitle: txt,
      buttons: ['Ok']
    });
    alert.present();
  }
 

}
