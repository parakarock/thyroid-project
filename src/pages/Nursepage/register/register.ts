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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder
  ) {
    this.formgroup = formBuilder.group({
      title: ["", Validators.required],
      fname: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[ก-๏s]+$")
        ])
      ],
      lname: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[ก-๏s]+$")
        ])
      ],
      birthday: ["", Validators.required],
      idCard: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
          Validators.pattern("[0-9]+")
        ])
      ],
      sex: ["", Validators.required],
      National: [
        "ไทย",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[ก-๏s]+$")
        ])
      ],
      status: ["", Validators.required],
      tel: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
          Validators.pattern("[0-9]+")
        ])
      ]
    });
  }
  updateAge() {
    this.age = moment().diff(
      moment(this.formgroup.controls.birthday.value, "YYYY-MM-DD"),
      "years"
    );
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }
  onClickToRegister() {
    this.navCtrl.push(RegistersPage, this.formgroup.value);
    // let headers = new Headers({ "Content-type": "application/json" });
    // let options = new RequestOptions({ headers: headers });
    // let body = JSON.stringify({
    //    idcard: this.IdCard.value,
    //    title: this.title,
    //    firstname: this.FlName.value,
    //    lastname: this.LtName.value,
    //    dof: this.DateOfBirth,
    //    gender: this.sex,
    //    national: this.national.value,
    //    status: this.status,
    //    phone: this.tel.value
    //  });

    //  this.http
    //   .post("http://localhost:8000/insert.php", body, options)
    //   .map(res => res.json())
    //   .subscribe(data => {
    //     console.log(data);
    //   },error=>{
    //     console.log(error);
    //   });

    // let headers = new Headers({ "Content-type": "application/json" });
    // let options = new RequestOptions({ headers: headers });
    // let body = JSON.stringify({
    //    idcard: this.IdCard.value,
    //    title: this.title,
    //    firstname: this.FlName.value,
    //    lastname: this.LtName.value,
    //    dof: this.DateOfBirth,
    //    gender: this.sex,
    //    national: this.national.value,
    //    status: this.status,
    //    phone: this.tel.value
    //  });

    //  this.http
    //   .post("http://localhost:8000/insert.php", body, options)
    //   .map(res => res.json())
    //   .subscribe(data => {
    //     console.log(data);
    //   },error=>{
    //     console.log(error);
    //   });


    //   this.navCtrl.push(RegistersPage)

  //   this.http
  //     .get("http://localhost:3000/", data)
  //     .map(res => res.json())
  //     .subscribe(data => {
  //       console.log(data);
  //     });


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
