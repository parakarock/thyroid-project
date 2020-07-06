import { Component, ViewChild } from "@angular/core";
import { NavController, MenuController, Slides } from "ionic-angular";
import {GlobalProvider} from '../../../providers/global/global'
import { LoginPage } from "../login/login";
import { Events } from "ionic-angular";
import {
  Http
} from "@angular/http";

import "rxjs/add/operator/map";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  url: string;
  posts: any = [];
  showButton = true
  title;
  googleToken1: string="AIzaSyD9U_vfpvJt8aCVUDy_vRiW70xLCUbPxY8";
  googleToken2: string="AIzaSyDsBqTOtXTm43wSr68NGejE6SlyrpBWq6I";
  playlistId: string = "PL1D3jrUPZCAYRd5eCL4x4S_bW9jp6MM2p";
  @ViewChild(Slides) slides: Slides;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public events: Events,
    public global: GlobalProvider,
    private http: Http
  ) {
    
    this.url =
      "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=" +
      this.playlistId +
      "&key=" +
      this.googleToken1;
    this.http
      .get(this.url)
      .map((res) => res.json())
      .subscribe(
        (data) => {
          this.posts = this.posts.concat(data.items);
          console.log(this.posts);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  ionViewDidLoad() {
    
    // console.log("ionViewDidLoad")
  }
  ionViewWillEnter(){
    this.isPatient()
    console.log(this.global.getSelectRole());
  }

  goLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  isPatient(){
    if(this.global.getSelectRole() == "ผู้ป่วย"){
      this.showButton = false
      this.title = "ความรู้"
    }else{
      this.showButton = true
      this.title = "หน้าแรก"
    }
  }
}
