import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NurseHomePage } from '../Nursepage/nurse-home/nurse-home';
import { AppointmentPage } from '../Nursepage/appointment/appointment';
import { ContactPage } from '../Homepage/contact/contact';

/**
 * Generated class for the NurseTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-nurse-tabs',
  templateUrl: 'nurse-tabs.html'
})
export class NurseTabsPage {

  homeRoot = NurseHomePage
  appointmentRoot = AppointmentPage
  contactRoot = ContactPage


  constructor(public navCtrl: NavController) {}

}
