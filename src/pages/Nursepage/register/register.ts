import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import "rxjs/add/operator/map";
import { RegistersPage } from "../registers/registers";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import moment from "moment";
import "moment/locale/TH";



// import "rxjs/add/operator/catch";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  formgroup: FormGroup;
  age=0;
  language:any;
  startMin: any;
  startMax: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder
  ) {
    this.startMin = moment().add(443, 'y').format("YYYY");
    this.startMax = moment().add(543, 'y').format("YYYY");

    this.formgroup = formBuilder.group({
      title: ["นาย", Validators.required],
      fname: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[ก-๏sa-zA-Z]+$")
        ])
      ],
      lname: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[ก-๏sa-zA-Z]+$")
        ])
      ],
      birthday: [moment().add(543, 'y').format(), Validators.required],
      idCard: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(13),
          Validators.pattern("[0-9a-zA-Z]+")

        ])
      ],
      sex: ["หญิง", Validators.required],
      National: [
        "ไทย",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[ก-๏sa-zA-Z]+$")
        ])
      ],
      status: ["โสด", Validators.required],
      tel: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          Validators.pattern("[0-9]+")
        ])
      ]
    });
  }

  updateAge() {
    this.age = moment().diff(
      moment(this.formgroup.controls.birthday.value).subtract(543, 'y'),
      "years"
    )
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");

  }
  onClickToRegister() {
    this.formgroup.controls.birthday.setValue(moment(this.formgroup.controls.birthday.value).format("YYYY-MM-DD"));
   this.navCtrl.push(RegistersPage, this.formgroup.value);
  }
//   doRegister(){
//     console.log(this.formgroup.value);
//     console.log(this.formgroup.valid);
// }
  // getDayNames(): Array<string> {
	//   return [
	//           this.translate.instant('date:day:1:long'),
	//           this.translate.instant('date:day:2:long'),
	//           this.translate.instant('date:day:3:long'),
	//           this.translate.instant('date:day:4:long'),
	//           this.translate.instant('date:day:5:long'),
	//           this.translate.instant('date:day:6:long'),
	//           this.translate.instant('date:day:7:long')
	//   ];
  // }


  // }
  doRegister() {
    console.log(this.formgroup.value);
    console.log(this.formgroup.valid);
  }
}

