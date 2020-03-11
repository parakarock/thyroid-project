import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Http, Headers, RequestOptions, ResponseOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { RegistersPage } from "../registers/registers";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";

// import "rxjs/add/operator/catch";



@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  // @ViewChild("ttName") TtName;
  @ViewChild("flName") FlName;
  @ViewChild("ltName") LtName;
  // @ViewChild("DOB") dob;
  @ViewChild("idCard") IdCard;
  // @ViewChild("Sex") sex;
  @ViewChild("National") national;
  // @ViewChild("Status") status;
  @ViewChild("Tel") tel;
  title:string;
  DateOfBirth:string;
  sex:string;
  status:string;
  url: string;
  data: string;
  // formgroup: FormGroup;
  // titles:AbstractControl;
  // fname:AbstractControl;
  // lname:AbstractControl;

  constructor(
    public http: Http,
    public navCtrl: NavController,
    // public translate: TranslateService,
    public navParams: NavParams, public formBuilder:FormBuilder
  ) {
  //   this.formgroup = formBuilder.group({
  //     titles: ['', Validators.required],
  //     fname: ['', Validators.required],
  //     lname: ['', Validators.required],

  //   });
  //  this.titles = this.formgroup.controls['titles'];
  //  this.fname = this.formgroup.controls['fname'];
  //  this.lname = this.formgroup.controls['lname'];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }
  onClickToRegister() {

    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
       idcard: this.IdCard.value,
       title: this.title,
       firstname: this.FlName.value,
       lastname: this.LtName.value,
       dof: this.DateOfBirth,
       gender: this.sex,
       national: this.national.value,
       status: this.status,
       phone: this.tel.value
     });

     this.http
      .post("http://localhost:8000/insert.php", body, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      },error=>{
        console.log(error);
      });

      this.navCtrl.push(RegistersPage)

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
}
