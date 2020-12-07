import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { GlobalProvider } from "../../../providers/global/global";
import { Http, Headers, RequestOptions } from "@angular/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-adddatacontact',
  templateUrl: 'adddatacontact.html',
})
export class AdddatacontactPage {
  formgroup: FormGroup;
  title = "เพิ่มข้อมูลติดต่อ"
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public global: GlobalProvider,
    public http: Http,
    public alertCtrl: AlertController) {
      this.formgroup = formBuilder.group({
        contact_level: [this.navParams.get("contact_level"), Validators.required],
        contact_title: [this.navParams.get("contact_title")||"นาย", Validators.required],
        contact_fname: [
          this.navParams.get("contact_fname"),
          Validators.compose([
            Validators.required,
            Validators.pattern("^[ก-๏sa-zA-Z0-9]+$"),
          ]),
        ],
        contact_lname: [
          this.navParams.get("contact_lname"),
          Validators.compose([
            Validators.required,
            Validators.pattern("^[ก-๏sa-zA-Z0-9]+$"),
          ]),
        ],
        contact_position: [this.navParams.get("contact_position"), Validators.required],
        contact_department: [this.navParams.get("contact_department"), Validators.required],
        contact_hospital: [this.navParams.get("contact_hospital"), Validators.required],
      });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddhosPage");
    if(this.navParams.get("event") == "edit"){
      this.title = "แก้ไขข้อมูลติดต่อ"
    }
  }

  AddHospital() {
    let body = { 
      contact_id: this.navParams.get("contact_id")||null,
      contact_level: this.formgroup.controls.contact_level.value,
      contact_title: this.formgroup.controls.contact_title.value || null,
      contact_fname: this.formgroup.controls.contact_fname.value,
      contact_lname: this.formgroup.controls.contact_lname.value,
      contact_position: this.formgroup.controls.contact_position.value,
      contact_department: this.formgroup.controls.contact_department.value,
      contact_hospital: this.formgroup.controls.contact_hospital.value,
      path_profile:this.navParams.get("path_profile")||null
    };
    let event
    if(this.navParams.get("event") == "edit"){
      event = "update_contact"
    }else{
      event = "insert_contact"
    }
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    this.http
      .post(
        "http://" +
          this.global.getIP() +
          "/contact.php?method="+event+"&role=" +
          this.global.getSelectRole(),
        body,
        options
      )
      .map((res) => res.json())
      .subscribe(
        (data) => {
          this.presentAlert(data.result);
          if (
            data.result !== "Fail") {
            this.navCtrl.pop();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }


  async presentAlert(txt: string) {
    let alert = await this.alertCtrl.create({
      title: "การแจ้งเตือน",
      subTitle: txt,
      buttons: ["Ok"],
    });
    alert.present();
  }
  async presentConfirm() {
    let txt
    if(this.navParams.get("event") == "edit"){
      txt = "ยืนยันการแก้ไขข้อมูล"
    }else{
      txt = "ยืนยันการบันทึกข้อมูล"
    }
    let alert = await this.alertCtrl.create({
      title: txt,
      message: "",
      buttons: [
        {
          text: "ยกเลิก",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "ยืนยัน",
          handler: () => {
            this.AddHospital();
          }
        }
      ]
    });
    alert.present();
  }

}
