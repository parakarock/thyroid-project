import { Component,ViewChild } from "@angular/core";
import { NavController,MenuController,Slides} from "ionic-angular";
import { LoginPage } from '../login/login';
import { Events } from 'ionic-angular';

import "rxjs/add/operator/map";


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  url: string;
  data: string;
  @ViewChild(Slides) slides: Slides;
  
  constructor(public navCtrl: NavController,public menuCtrl:MenuController,public events: Events) {}
  ionViewDidLoad() {
    // this.loadUser();
    // console.log("dddd")
    this.events.publish("user:guest");
    
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

  // loadUser() {
  //   this.http
  //     .get("https://www.randomuser.me/api/?results=20")
  //     .map(res => res.json())
  //     .subscribe(
  //       data => {
  //         this.data = data.results;
  //         console.log(data.results);
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     );
  // }

  // sentToDetail(gg){
  //   this.navCtrl.push(LoginPage,{text:gg})
  // }
  goLoginPage(){
    this.navCtrl.push(LoginPage)
  }
}



