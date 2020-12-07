import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams,AlertController, } from "ionic-angular";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import {
  Http,
  Response,
  Headers,
  ResponseOptions,
  RequestOptions
} from "@angular/http";
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the ChangepassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-changepass",
  templateUrl: "changepass.html",
})
export class ChangepassPage {
  formgroup: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private http: Http,
    public global: GlobalProvider
  ) {
    this.formgroup = formBuilder.group({
      oldPassword: ["", Validators.required],
      password: ["",Validators.required],
      confirmPassword: ["",Validators.required]
    });
  }

  checkMatch(){
    if(this.formgroup.controls.password.value === this.formgroup.controls.confirmPassword.value){
      this.presentConfirm()
    }else{
      this.presentAlert("เกิดข้อผิดพลาด","รหัสผ่านไม่ตรงกัน")
    }
  }

  updatePass(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body ={
      idcard: this.global.getLoginID(),
      oldpass: this.formgroup.controls.oldPassword.value,
      newpass: this.formgroup.controls.confirmPassword.value,

    };
    this.http
      .post(
        "https://"+this.global.getIP()+"/login.php?method=changePassTab&role="+this.global.getSelectRole(),
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if(data.result){
            this.presentAlert("เกิดข้อผิดพลาด",data.result)
          }else{
            this.presentAlert("รหัสผ่านใหม่","Username : "+data.username+"<br>"+"Password : "+data.password);
            this.navCtrl.pop();
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChangepassPage");
  }
  async presentAlert(title:string,txt: string) {
    let alert = await this.alertCtrl.create({
      title: title,
      subTitle: txt,
      buttons: ['Ok']
    });
    alert.present();
  }

  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      title: 'ยืนยันการเปลี่ยนรหัสผ่าน',
      message: "รหัสผ่านเดิม : "+this.formgroup.controls.oldPassword.value+"<br>"+"รหัสผ่านใหม่ : "+this.formgroup.controls.confirmPassword.value,
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
          this.updatePass()
          }
        }
      ]
    });
    alert.present();
  }
}
