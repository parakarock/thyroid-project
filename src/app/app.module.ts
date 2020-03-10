import { EditlabtestPage } from '../pages/Nursepage/ผลการตรวจทางห้องแลป/editlabtest/editlabtest';
import { EdittreatmentresultPage } from '../pages/Doctorpage/edittreatmentresult/edittreatmentresult';
import { AddtreatmentresultPage } from '../pages/Doctorpage/addtreatmentresult/addtreatmentresult';
import { FollowuptreatmentresultPage } from '../pages/Doctorpage/followuptreatmentresult/followuptreatmentresult';
import { EditiodineresultdetailPage } from '../pages/Doctorpage/editiodineresultdetail/editiodineresultdetail';
import { IodineresultdetailPage } from '../pages/Doctorpage/iodineresultdetail/iodineresultdetail';
import { IodineresultPage } from '../pages/Doctorpage/iodineresult/iodineresult';
import { DoctorHomePage } from '../pages/Doctorpage/doctor-home/doctor-home';
import { LabtestresultPage } from '../pages/Nursepage/ผลการตรวจทางห้องแลป/labtestresult/labtestresult';
import { AddlabtestPage } from '../pages/Nursepage/ผลการตรวจทางห้องแลป/addlabtest/addlabtest';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AppointmentPage } from "../pages/Nursepage/appointment/appointment";

// import { File } from '@ionic-native/file';
// import { IonicStorageModule } from '@ionic/storage'


import { AboutPage } from '../pages/Homepage/about/about';
import { ContactPage } from '../pages/Homepage/contact/contact';
import { HomePage } from '../pages/Homepage/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/Homepage/login/login";
import { RegisterPage } from '../pages/Nursepage/register/register';
import { NurseHomePage } from '../pages/Nursepage/nurse-home/nurse-home';
import { NurseTabsPage } from '../pages/nurse-tabs/nurse-tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegisterProvider } from '../providers/register/register';
import { RegistersPage } from "../pages/Nursepage/registers/registers";
import { ToxinthyPage} from "../pages/Nursepage/ข้อมูลด้านสุขภาพ/toxinthy/toxinthy";
import { AgreePage} from "../pages/Nursepage/ข้อมูลด้านสุขภาพ/agree/agree";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangepassPage} from "../pages/changepass/changepass";

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
import { EatfoodPage} from '../pages/Nursepage/ขั้นตอนการเตรียมตัว/eatfood/eatfood';
import { NofoodPage} from '../pages/Nursepage/ขั้นตอนการเตรียมตัว/nofood/nofood';

import { TestresultPage} from '../pages/Doctorpage/ผลการตรวจ/testresult/testresult';
import { PhysicalPage} from '../pages/Doctorpage/ผลการตรวจ/physical/physical';
import { PhysicalsPage} from '../pages/Doctorpage/ผลการตรวจ/physicals/physicals';
import { LabPage} from '../pages/Doctorpage/ผลการตรวจ/lab/lab';
import { RadiographicPage} from '../pages/Doctorpage/ผลการตรวจ/radiographic/radiographic';
import { RadiographicsPage} from '../pages/Doctorpage/ผลการตรวจ/radiographics/radiographics';
import { ExaminationPage} from '../pages/Doctorpage/ผลการตรวจ/examination/examination';
import { BiopsyPage} from '../pages/Doctorpage/ผลการตรวจ/biopsy/biopsy';
import { EditphysicalPage} from '../pages/Doctorpage/ผลการตรวจ/editphysical/editphysical';
import { EditphysicalsPage} from '../pages/Doctorpage/ผลการตรวจ/editphysicals/editphysicals';
import { EditlabPage} from '../pages/Doctorpage/ผลการตรวจ/editlab/editlab';
import { EditbiopsyPage} from '../pages/Doctorpage/ผลการตรวจ/editbiopsy/editbiopsy';
import { DiagnosticResultsPage} from '../pages/Doctorpage/ผลการตรวจ/diagnostic-results/diagnostic-results';
import { GlobalProvider } from '../providers/global/global';

import { PatientHomePage } from '../pages/Patientpage/patient-home/patient-home';

import { AdminhomePage } from '../pages/AdminPage/adminhome/adminhome';
import { DatauserPage } from '../pages/AdminPage/datauser/datauser';
import { DatahosPage } from '../pages/AdminPage/datahos/datahos';
import { DdPage } from '../pages/AdminPage/dd/dd';
import { DpPage } from '../pages/AdminPage/dp/dp';
import { DnPage } from '../pages/AdminPage/dn/dn';
import { AdddatauserPage } from '../pages/AdminPage/adddatauser/adddatauser';

import { QrscanPage } from '../pages/qrscan/qrscan';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    RegistersPage,
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
    EditbiopsyPage,
    PatientHomePage,
    ToxinthyPage,
    AgreePage,
    ChangepassPage,
    AdminhomePage,
    DatauserPage,
    DatahosPage,
    DdPage,
    DpPage,
    DnPage,
    QrscanPage,
    AdddatauserPage,
    EatfoodPage,
    NofoodPage,
    AppointmentPage


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
    RegistersPage,
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
    EditbiopsyPage,
    PatientHomePage,
    ToxinthyPage,
    AgreePage,
    ChangepassPage,
    AdminhomePage,
    DatauserPage,
    DatahosPage,
    DdPage,
    DpPage,
    DnPage,
    QrscanPage,
    AdddatauserPage,
    EatfoodPage,
    NofoodPage,
    AppointmentPage
  
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
