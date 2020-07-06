import { Component } from "@angular/core";
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
  selector: "page-addhos",
  templateUrl: "addhos.html",
})
export class AddhosPage {
  formgroup: FormGroup;
  title = "เพิ่มข้อมูลโรงพยาบาล"
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public global: GlobalProvider,
    public http: Http,
    public alertCtrl: AlertController
  ) {
    this.formgroup = formBuilder.group({
      hos_id: [this.navParams.get("h_id")],
      hos_name: [
        this.navParams.get("hos_name"),
        Validators.compose([
          Validators.required,
          Validators.pattern("^[ก-๏sa-zA-Z0-9]+$"),
        ]),
      ],
      address: [this.navParams.get("address"),Validators.required],
      tel: [
        this.navParams.get("phone"),
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          Validators.pattern("[0-9]+"),
        ]),
      ],
      SerumT3st: [this.navParams.get("freeT3_standard"), Validators.required],
      SerumT4st: [this.navParams.get("freeT4_standard"), Validators.required],
      SerumTSHst: [this.navParams.get("TSH_standard"), Validators.required],
      SerumTRAbst: [this.navParams.get("TRAb_standard"), Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddhosPage");
    if(this.navParams.get("event") == "edit"){
      this.title = "แก้ไขข้อมูลโรงพยาบาล"
    }
  }

  AddHospital() {
    let body = {
      id: this.navParams.get("id")||null,
      h_id: this.formgroup.controls.hos_id.value || null,
      hos_name: this.formgroup.controls.hos_name.value,
      address: this.formgroup.controls.address.value,
      phone: this.formgroup.controls.tel.value,
      freeT3_standard: this.formgroup.controls.SerumT3st.value,
      freeT4_standard: this.formgroup.controls.SerumT4st.value,
      TSH_standard: this.formgroup.controls.SerumTSHst.value,
      TRAb_standard: this.formgroup.controls.SerumTRAbst.value,
    };
    let event
    if(this.navParams.get("event") == "edit"){
      event = "update_hospital"
    }else{
      event = "insert_hospital"
    }
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    this.http
      .post(
        "http://" +
          this.global.getIP() +
          "/admin.php?method="+event+"&role=" +
          this.global.getSelectRole(),
        body,
        options
      )
      .map((res) => res.json())
      .subscribe(
        (data) => {
          this.presentAlert(data.result);
          if (
            data.result !== "Fail" &&
            data.result !== "hospital name already exist."
          ) {
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
