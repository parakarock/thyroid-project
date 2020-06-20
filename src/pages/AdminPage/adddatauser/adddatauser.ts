import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GlobalProvider } from "../../../providers/global/global";
import { Http, Headers, RequestOptions } from "@angular/http";
import moment from "moment";
import "moment/locale/TH";

/**
 * Generated class for the AdddatauserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-adddatauser",
  templateUrl: "adddatauser.html",
})
export class AdddatauserPage {
  formgroup: FormGroup;
  age = 0;
  startMin: any;
  startMax: any;
  doctorRole: boolean = false;
  nurseRole: boolean = false;
  patientRole: boolean = false;

  doctorControl: boolean = false;
  nurseControl: boolean = false;
  patientControl: boolean = false;

  editID: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public global: GlobalProvider,
    public alertCtrl: AlertController,
    private http: Http
  ) {
    this.startMin = moment().add(443, "y").format("YYYY");
    this.startMax = moment().add(543, "y").format("YYYY");

    this.formgroup = formBuilder.group({
      title: [this.navParams.get("title")||"นาย", Validators.required],
      fname: [
        this.navParams.get("firstname")||"",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[ก-๏sa-zA-Z]+$"),
        ]),
      ],
      lname: [
        this.navParams.get("lastname")||"",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[ก-๏sa-zA-Z]+$"),
        ]),
      ],
      birthday: [this.navParams.get("birthdate")||moment().add(543, "y").format(), Validators.required],
      idCard: [
        this.navParams.get("person_id")||"",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(13),
          Validators.pattern("[0-9a-zA-Z]+"),
        ]),
      ],
      sex: [this.navParams.get("gender")||"หญิง", Validators.required],
      National: [
        this.navParams.get("nationality")||"ไทย",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[ก-๏sa-zA-Z]+$"),
        ]),
      ],
      status: [this.navParams.get("status")||"โสด", Validators.required],
      tel: [
        this.navParams.get("phone")||"",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          Validators.pattern("[0-9]+"),
        ]),
      ],
    });
  }

  updateAge() {
    this.age = moment().diff(
      moment(this.formgroup.controls.birthday.value).subtract(543, "y"),
      "years"
    );
  }

  register() {
    if (this.checkRoleSelectMoreThanOne() == true) {
      this.formgroup.controls.birthday.setValue(
        moment(this.formgroup.controls.birthday.value).format("YYYY-MM-DD")
      );
      let body = 
        {
          idcard: this.formgroup.controls.idCard.value,
          title: this.formgroup.controls.title.value,
          firstname: this.formgroup.controls.fname.value,
          lastname: this.formgroup.controls.lname.value,
          dof: this.formgroup.controls.birthday.value,
          gender: this.formgroup.controls.sex.value,
          national: this.formgroup.controls.National.value,
          status: this.formgroup.controls.status.value,
          phone: this.formgroup.controls.tel.value,
          patient: this.createRole(this.patientRole),
          nurse: this.createRole(this.nurseRole),
          doctor: this.createRole(this.doctorRole),
        }
      console.log(body);
      let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let event
    if(this.navParams.get('event') == 'edit'){
      event = 'update_user'
    }else{
      event = 'insert_user'
    }
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
          if(data.result !== "Fail"){
            if(event == 'insert_user'){
              this.presentAlertUser("Username : "+data.username+"<br>"+"Password : "+data.password);
            }else{
              this.presentAlert(data.result);
            }
            this.navCtrl.pop();
          }else{
            this.presentAlert(data.result);
          }
        },
        (error) => {
          console.log(error);
        }
      );

    }
  }
  checkRoleSelectMoreThanOne() {
    let count:number = 0;
    if (
      this.doctorRole == true ||
      this.nurseRole == true ||
      this.patientRole == true
    ) {
      count++;
    }
    if (count > 0) {
      return true
    } else {
      this.presentAlert("กรุณาเลือกบทบาทอย่างน้อย 1 ตัวเลือก");
      return false
    }
  }

  createRole(value) {
    if (value == false) {
      return null;
    } else {
      return "add";
    }
  }

  changeDoctor() {
    this.doctorRole = !this.doctorRole;
    console.log(this.doctorRole);
  }
  changeNurse() {
    this.nurseRole = !this.nurseRole;
    console.log(this.nurseRole);
  }
  changePatient() {
    this.patientRole = !this.patientRole;
    console.log(this.patientRole);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AdddatauserPage");
    this.roleControl(this.navParams.get("role"));
    if (this.navParams.get("event") == "edit") {
      this.getRole();
      this.updateAge()
      this.editID = false
    }
  }

  roleControl(value) {
    if (value == "ผู้ป่วย") {
      this.patientControl = true;
      this.patientRole = true;
    }
    if (value == "หมอ") {
      this.doctorControl = true;
      this.doctorRole = true;
    }
    if (value == "พยาบาล") {
      this.nurseControl = true;
      this.nurseRole = true;
    }
  }

  getRole() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({ idcard: this.navParams.get("person_id") });
    console.log("body : " + body);
    this.http
      .post(
        "http://" +
          this.global.getIP() +
          "/admin.php?method=getrole_user&role=" +
          this.global.getSelectRole(),
        body,
        options
      )
      .map((res) => res.json())
      .subscribe(
        (data) => {
          console.log(data);
          if (data.result) {
            this.presentAlert(data.result);
          } else {
            if (
              data.findIndex((role_name) => role_name.role_name === "หมอ") >= 0
            ) {
              this.doctorRole = true;
            }
            if (
              data.findIndex((role_name) => role_name.role_name === "พยาบาล") >=
              0
            ) {
              this.nurseRole = true;
            }
            if (
              data.findIndex(
                (role_name) => role_name.role_name === "ผู้ป่วย"
              ) >= 0
            ) {
              this.patientRole = true;
            }
          }
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  }

  async presentAlert(txt: string) {
    let alert = await this.alertCtrl.create({
      title: "เกิดข้อผิดพลาด",
      subTitle: txt,
      buttons: ["Ok"],
    });
    alert.present();
  }
  async presentAlertUser(txt: string) {
    let alert = await this.alertCtrl.create({
      title: 'รหัสผ่านของผู้ป่วย',
      subTitle: txt,
      buttons: ['Ok']
    });
    alert.present();
  }

  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      title: 'ยืนยันการบันทึก',
      message: '',
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
           this.register();
          }
        }
      ]
    });
    alert.present();
  }
}


