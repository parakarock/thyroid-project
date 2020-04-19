import { Component, ViewChild } from "@angular/core";
import { NavController, MenuController, Slides } from "ionic-angular";
import { LoginPage } from "../login/login";
import { Events } from "ionic-angular";
import {
  Http,
  Response,
  Headers,
  ResponseOptions,
  RequestOptions,
} from "@angular/http";

import "rxjs/add/operator/map";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  url: string;
  posts: any = [];
  googleToken1: string="AIzaSyD9U_vfpvJt8aCVUDy_vRiW70xLCUbPxY8";
  googleToken2: string="AIzaSyDsBqTOtXTm43wSr68NGejE6SlyrpBWq6I";
  playlistId: string = "PLME1fWasJoeXCQeeJlZafOJzNPlCE5kH-";
  @ViewChild(Slides) slides: Slides;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public events: Events,
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
    this.events.publish("user:guest");
  }

  goLoginPage() {
    this.navCtrl.push(LoginPage);
  }
}
