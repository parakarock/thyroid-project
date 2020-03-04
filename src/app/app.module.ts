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

// import { File } from '@ionic-native/file';
// import { IonicStorageModule } from '@ionic/storage'


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


import { HealthdatahomePage } from '../pages/Nursepage/ข้อมูลด้านสุขภาพ/healthdatahome/healthdatahome';
import { GeneralPage } from '../pages/Nursepage/ข้อมูลด้านสุขภาพ/general/general';
import { InitiallyPage} from '../pages/Nursepage/ข้อมูลด้านสุขภาพ/initially/initially';
import { RiskyPage} from '../pages/Nursepage/ข้อมูลด้านสุขภาพ/risky/risky';
import { TabooPage } from '../pages/Nursepage/ข้อมูลด้านสุขภาพ/taboo/taboo';
import { HistoryPage } from '../pages/Nursepage/ข้อมูลด้านสุขภาพ/history/history';
import { EditgeneralPage } from '../pages/Nursepage/ข้อมูลด้านสุขภาพ/editgeneral/editgeneral';
import { EditinitiallyPage } from '../pages/Nursepage/ข้อมูลด้านสุขภาพ/editinitially/editinitially';
import { EditriskyPage } from '../pages/Nursepage/ข้อมูลด้านสุขภาพ/editrisky/editrisky';
import { EditTabooPage } from '../pages/Nursepage/ข้อมูลด้านสุขภาพ/edit-taboo/edit-taboo';
import { EdithistoryPage } from '../pages/Nursepage/ข้อมูลด้านสุขภาพ/edithistory/edithistory';
import { PreparehomePage } from '../pages/Nursepage/ขั้นตอนการเตรียมตัว/preparehome/preparehome';
import { ContraceptivePage } from '../pages/Nursepage/ขั้นตอนการเตรียมตัว/contraceptive/contraceptive';
import { AntidepressantPage } from '../pages/Nursepage/ขั้นตอนการเตรียมตัว/antidepressant/antidepressant';
import { AvoideatingPage } from '../pages/Nursepage/ขั้นตอนการเตรียมตัว/avoideating/avoideating';
import { PracticePage } from '../pages/Nursepage/ขั้นตอนการเตรียมตัว/practice/practice';
import { DataswallowPage } from '../pages/Nursepage/ขั้นตอนการเตรียมตัว/dataswallow/dataswallow';
import { EditcontraceptivePage } from '../pages/Nursepage/ขั้นตอนการเตรียมตัว/editcontraceptive/editcontraceptive';
import { EditantidepressantPage } from '../pages/Nursepage/ขั้นตอนการเตรียมตัว/editantidepressant/editantidepressant';
import { EditavoideatingPage } from '../pages/Nursepage/ขั้นตอนการเตรียมตัว/editavoideating/editavoideating';
import { EditdataswallowPage } from '../pages/Nursepage/ขั้นตอนการเตรียมตัว/editdataswallow/editdataswallow';
import { AddcontraceptivePage} from '../pages/Nursepage/ขั้นตอนการเตรียมตัว/addcontraceptive/addcontraceptive';
import { EditdatePage} from '../pages/Nursepage/ขั้นตอนการเตรียมตัว/editdate/editdate';

import { TestresultPage} from '../pages/Nursepage/ผลการตรวจ/testresult/testresult';
import { PhysicalPage} from '../pages/Nursepage/ผลการตรวจ/physical/physical';
import { PhysicalsPage} from '../pages/Nursepage/ผลการตรวจ/physicals/physicals';
import { LabPage} from '../pages/Nursepage/ผลการตรวจ/lab/lab';
import { RadiographicPage} from '../pages/Nursepage/ผลการตรวจ/radiographic/radiographic';
import { RadiographicsPage} from '../pages/Nursepage/ผลการตรวจ/radiographics/radiographics';
import { ExaminationPage} from '../pages/Nursepage/ผลการตรวจ/examination/examination';
import { BiopsyPage} from '../pages/Nursepage/ผลการตรวจ/biopsy/biopsy';
import { EditphysicalPage} from '../pages/Nursepage/ผลการตรวจ/editphysical/editphysical';
import { EditphysicalsPage} from '../pages/Nursepage/ผลการตรวจ/editphysicals/editphysicals';
import { EditlabPage} from '../pages/Nursepage/ผลการตรวจ/editlab/editlab';
import { EditbiopsyPage} from '../pages/Nursepage/ผลการตรวจ/editbiopsy/editbiopsy';
import { DiagnosticResultsPage} from '../pages/Nursepage/ผลการตรวจ/diagnostic-results/diagnostic-results';
import { GlobalProvider } from '../providers/global/global';

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
    EdittreatmentresultPage,
    HealthdatahomePage,
    GeneralPage,
    InitiallyPage,
    RiskyPage,
    TabooPage,
    HistoryPage,
    EditgeneralPage,
    EditinitiallyPage,
    EditriskyPage,
    EditTabooPage,
    EdithistoryPage,
    PreparehomePage,
    ContraceptivePage,
    AntidepressantPage,
    AvoideatingPage,
    PracticePage,
    DataswallowPage,
    EditcontraceptivePage,
    EditantidepressantPage,
    EditavoideatingPage,
    EditdataswallowPage,
    AddcontraceptivePage,
    EditphysicalsPage,
    EditdatePage,
    TestresultPage,
    PhysicalPage,
    PhysicalsPage,
    LabPage,
    RadiographicPage,
    RadiographicsPage,
    ExaminationPage,
    BiopsyPage,
    EditphysicalPage,
    EditlabPage,
    DiagnosticResultsPage,
    EditbiopsyPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule,
    ReactiveFormsModule
    // IonicStorageModule.forRoot()
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
    EdittreatmentresultPage,

    HealthdatahomePage,
    GeneralPage,
    InitiallyPage,
    RiskyPage,
    TabooPage,
    HistoryPage,
    EditgeneralPage,
    EditinitiallyPage,
    EditriskyPage,
    EditTabooPage,
    EdithistoryPage,
    PreparehomePage,
    ContraceptivePage,
    AntidepressantPage,
    AvoideatingPage,
    PracticePage,
    DataswallowPage,
    EditcontraceptivePage,
    EditantidepressantPage,
    EditavoideatingPage,
    EditdataswallowPage,
    AddcontraceptivePage,
    EditphysicalsPage,
    EditdatePage,
    TestresultPage,
    PhysicalPage,
    PhysicalsPage,
    LabPage,
    RadiographicPage,
    RadiographicsPage,
    ExaminationPage,
    BiopsyPage,
    EditphysicalPage,
    EditlabPage,
    DiagnosticResultsPage,
    EditbiopsyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RegisterProvider,
    GlobalProvider
    
  ]
})
export class AppModule {}
