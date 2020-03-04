import { EditlabtestPage } from '../pages/Nursepage/editlabtest/editlabtest';
import { EdittreatmentresultPage } from '../pages/Doctorpage/edittreatmentresult/edittreatmentresult';
import { AddtreatmentresultPage } from '../pages/Doctorpage/addtreatmentresult/addtreatmentresult';
import { FollowuptreatmentresultPage } from '../pages/Doctorpage/followuptreatmentresult/followuptreatmentresult';
import { EditiodineresultdetailPage } from '../pages/Doctorpage/editiodineresultdetail/editiodineresultdetail';
import { IodineresultdetailPage } from '../pages/Doctorpage/iodineresultdetail/iodineresultdetail';
import { IodineresultPage } from '../pages/Doctorpage/iodineresult/iodineresult';
import { DoctorHomePage } from '../pages/Doctorpage/doctor-home/doctor-home';
import { LabtestresultPage } from '../pages/Nursepage/labtestresult/labtestresult';
import { AddlabtestPage } from './../pages/Nursepage/addlabtest/addlabtest';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { AboutPage } from '../pages/Homepage/about/about';
import { ContactPage } from '../pages/Homepage/contact/contact';
import { HomePage } from '../pages/Homepage/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/Homepage/login/login';
import { RegisterPage } from '../pages/Nursepage/register/register';
import { NurseHomePage } from '../pages/Nursepage/nurse-home/nurse-home';
import { NurseTabsPage } from '../pages/nurse-tabs/nurse-tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegisterProvider } from '../providers/register/register';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    NurseHomePage,
    NurseTabsPage,
    AddlabtestPage,
    EditlabtestPage,
    LabtestresultPage,
    DoctorHomePage,
    IodineresultPage,
    IodineresultdetailPage,
    EditiodineresultdetailPage,
    FollowuptreatmentresultPage,
    AddtreatmentresultPage,
    EdittreatmentresultPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    NurseHomePage,
    NurseTabsPage,
    AddlabtestPage,
    EditlabtestPage,
    LabtestresultPage,
    DoctorHomePage,
    IodineresultPage,
    IodineresultdetailPage,
    EditiodineresultdetailPage,
    FollowuptreatmentresultPage,
    AddtreatmentresultPage,
    EdittreatmentresultPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RegisterProvider
  ]
})
export class AppModule {}
