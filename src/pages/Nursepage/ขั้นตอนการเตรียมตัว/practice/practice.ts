import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import {
  AppLauncher,
  AppLauncherOptions,
} from "@ionic-native/app-launcher/ngx";
import {
  InAppBrowser,
  InAppBrowserOptions,
} from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
  selector: "page-practice",
  templateUrl: "practice.html",
})
export class PracticePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appLauncher: AppLauncher,
    public platform: Platform,
    private iab: InAppBrowser
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad PracticePage");
  }

  openweb() {
    const options: InAppBrowserOptions = {
      zoom: "no",
    };
    let url
    if (this.platform.is("ios")){
      url = 'https://apps.apple.com/app/id1481426181?fbclid=IwAR1wIdHqy6ZWGjRN6peFKov5Tfbc0QQ48tAAYqNeKtxUWlg9NG2u5a9gGcw'
    }else{
      url = 'https://play.google.com/store/apps/details?id=com.a23perspective.i_risk&fbclid=IwAR3mkA2elOsQW819mZ7HdY56ZTpluzI45ZTSLPKNIA8_C_StsJCHwtSVIwU'
    }
    const browser = this.iab.create(url, "_system", options);
  }
  
}
