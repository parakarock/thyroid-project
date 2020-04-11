import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { GlobalProvider } from "../../../../providers/global/global";
import { NurseHomePage } from "../../nurse-home/nurse-home";
import {
  Http,
  Response,
  Headers,
  ResponseOptions,
  RequestOptions
} from "@angular/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import moment from 'moment';
import 'moment/locale/TH';
/**
 * Generated class for the EditgeneralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-editgeneral",
  templateUrl: "editgeneral.html"
})
export class EditgeneralPage {
  formgroup: FormGroup;
  age;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private http: Http
  ) {
    this.formgroup = formBuilder.group({
      title: [navParams.get("title"), Validators.required],
      fname: [
        navParams.get("firstname"),
        Validators.compose([
          Validators.required,
          Validators.pattern("^[ก-๏s]+$")
        ])
      ],
      lname: [
        navParams.get("lastname"),
        Validators.compose([
          Validators.required,
          Validators.pattern("^[ก-๏s]+$")
        ])
      ],
      birthday: [navParams.get("date"), Validators.required],
      idCard: [
        navParams.get("idcard"),
        Validators.compose([
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
          Validators.pattern("[0-9]+")
        ])
      ],
      sex: [navParams.get("gender"), Validators.required],
      National: [
        navParams.get("national"),
        Validators.compose([
          Validators.required,
          Validators.pattern("^[ก-๏s]+$")
        ])
      ],
      status: [navParams.get("status"), Validators.required],
      tel: [
        navParams.get("tel"),
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
          Validators.pattern("[0-9]+")
        ])
      ],

      from_id: [navParams.get("hninput"), Validators.pattern("[0-9]+")],
      to_id: [navParams.get("hnoutput"), Validators.pattern("[0-9]+")],
      Hos_base_id: [
        navParams.get("hnbuu"),
        Validators.compose([Validators.required, Validators.pattern("[0-9]+")])
      ],
      from_name2: [navParams.get("input"), Validators.pattern("^[ก-๏s]+$")],
      to_name2: [navParams.get("output"), Validators.pattern("^[ก-๏s]+$")]
    });
    this.updateAge();

  }
  updateAge(){
    this.age = moment().diff(moment(this.formgroup.controls.birthday.value,"YYYY-MM-DD"), 'years');
  }
  doUpdate() {
    console.log(this.formgroup.value);
    console.log(this.formgroup.valid);
  }
  updateData() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = {
      idcard: this.formgroup.controls.idCard.value,
      title: this.formgroup.controls.title.value,
      firstname: this.formgroup.controls.fname.value,
      lastname: this.formgroup.controls.lname.value,
      dof: this.formgroup.controls.birthday.value,
      gender: this.formgroup.controls.sex.value,
      national: this.formgroup.controls.National.value,
      status: this.formgroup.controls.status.value,
      phone: this.formgroup.controls.tel.value,
      from_id: this.formgroup.controls.from_id.value,
      to_id: this.formgroup.controls.to_id.value,
      Hos_base_h_id: this.formgroup.controls.Hos_base_id.value,
      from_name: this.formgroup.controls.from_name2.value,
      to_name: this.formgroup.controls.to_name2.value
    };

    console.log("body : " + body);
    this.http
      .post(
        "http://192.168.31.98:8000/healthdata.php?method=update_profile&role=nurse",
        body,
        options
      )
      .map(res => res.json())
      .subscribe(
        data => {
          if(data.result){
            this.presentAlert(data.result);
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad EditgeneralPage");
  }
  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      title: "ยืนยันการอัพเดทข้อมูล",
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
            this.updateData();
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
  async presentAlert(txt: string) {
    let alert = await this.alertCtrl.create({
      title: 'แจ้งเตือน',
      subTitle: txt,
      buttons: ['Ok']
    });
    alert.present();
  }
}
