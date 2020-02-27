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
    NurseTabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
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
    NurseTabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RegisterProvider
  ]
})
export class AppModule {}
