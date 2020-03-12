import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Http, Headers, RequestOptions, ResponseOptions } from "@angular/http";
// import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";

/**
 * Generated class for the RegistersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-registers",
  templateUrl: "registers.html"
})
export class RegistersPage {
  // formgroup: FormGroup;
  // hn:AbstractControl;
  from_id;
  to_id;
  Hos_base_id;
  from_name1;
  to_name1;
  from_name2;
  to_name2;

  hospitals;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
  ) {
    
    //   this.formgroup = formBuilder.group({
    //     hn: ['', Validators.required]
    //   });
    //  this.hn = this.formgroup.controls['hn'];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegistersPage");
    this.http
      .get("http://10.80.34.218:8000/admin.php?method=get_hospital&role=nurse")
      .map(res => res.json())
      .subscribe(
        data => {
          this.hospitals = data;
          console.log(this.hospitals);
        },
        error => {
          console.log(error);
        }
      );
  }
  //   doSignup(){
  //     console.log(this.formgroup.value);
  //     console.log(this.formgroup.valid);
  // }

  insertdata() {
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      idcard: this.navParams.get("idcard"),
      title: this.navParams.get("title"),
      firstname: this.navParams.get("firstname"),
      lastname: this.navParams.get("lastname"),
      dof: this.navParams.get("dof"),
      gender: this.navParams.get("gender"),
      national: this.navParams.get("national"),
      status: this.navParams.get("status"),
      phone: this.navParams.get("phone"),
      from_id: this.from_id,
      to_id: this.to_id,
      Hos_base_h_id: this.Hos_base_id,
      from_name: this.from_name1 || this.from_name2,
      to_name: this.to_name1 || this.to_name2
    });
    console.log(body);
    this.http
      .post("http://10.80.34.218:8000/register.php?method=insert_pantient&role=nurse", body, options)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );

   
  }
}
