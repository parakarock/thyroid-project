import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Http, Headers, RequestOptions, ResponseOptions } from "@angular/http";
import "rxjs/add/operator/map";
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

  constructor(
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

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
     
  //   this.http
  //     .get("http://localhost:3000/", data)
  //     .map(res => res.json())
  //     .subscribe(data => {
  //       console.log(data);
  //     });
  }
}
