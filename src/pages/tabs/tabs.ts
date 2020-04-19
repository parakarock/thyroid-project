import { Component } from "@angular/core";

//import { AboutPage } from '../Homepage/about/about';

import { HomePage } from "../Homepage/home/home";
import { ContactPage } from "../Homepage/contact/contact";
import { NurseHomePage } from "../Nursepage/nurse-home/nurse-home";
import { AppointmentPage } from "../Nursepage/appointment/appointment";
import { DoctorHomePage } from "../Doctorpage/doctor-home/doctor-home"
import { GlobalProvider } from "../../providers/global/global";
import { Events,NavController } from 'ionic-angular';

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  public show:boolean = false;

  constructor(public events: Events,public navCtrl: NavController,public global: GlobalProvider,) {
    events.subscribe('user:patient', () => {
      this.global.setSelectRole("ผู้ป่วย")
      this.tab1Root = NurseHomePage;
      this.tab2Root = "";
      this.tab3Root = ContactPage;
      this.show = false;
    });
    events.subscribe('user:nurse', () => {
      this.global.setSelectRole("พยาบาล")
      this.tab1Root = NurseHomePage;
      this.tab2Root = AppointmentPage;
      this.tab3Root = ContactPage;
      this.show = true;
    });
    events.subscribe('user:doctor', () => {
      this.global.setSelectRole("หมอ")
      this.tab1Root = DoctorHomePage;
      this.tab2Root = AppointmentPage;
      this.tab3Root = ContactPage;
      this.show = true;
    });
    events.subscribe('user:guest', () => {
      this.global.setSelectRole("guest")
      this.tab1Root = HomePage;
      this.tab2Root = "";
      this.tab3Root = ContactPage;
      this.show = false;
      
    });
      this.tab1Root = HomePage;
      this.tab2Root = "";
      this.tab3Root = ContactPage;
  }

}

