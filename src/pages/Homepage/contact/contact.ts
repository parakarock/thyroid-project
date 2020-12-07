import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { GlobalProvider } from "../../../providers/global/global";
import { Http, Headers, RequestOptions } from "@angular/http";

@Component({
  selector: "page-contact",
  templateUrl: "contact.html",
})
export class ContactPage {
  contacts: any = [];
  data: any = [];
  showData: boolean = false;
  constructor(
    public navCtrl: NavController,
    private http: Http,
    public global: GlobalProvider
  ) {}
 async ionViewWillEnter() {
   await this.setdata();
  }

 async setdata() {
    var action = "get_contact";
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });

   await this.http
      .post(
        "http://" +
          this.global.getIP() +
          "/contact.php?method=" +
          action +
          "&role=" +
          this.global.getSelectRole(),

        options
      )
      .map((res) => res.json())
      .subscribe(
        (data) => {
          console.log(data);
          if (data.result !== "Fail") {
            this.showData = true;
            this.data = data;
            this.contacts = data;
            console.log(data);
          } else {
            this.showData = false;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
