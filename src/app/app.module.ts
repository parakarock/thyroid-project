import moment from 'moment';
// import { EditlabtestPage } from '../pages/Nursepage/editlabtest/editlabtest';
import { EditlabtestPage } from '../pages/Nursepage/ผลการตรวจทางห้องแลป/editlabtest/editlabtest';
import { EdittreatmentresultPage } from '../pages/Doctorpage/edittreatmentresult/edittreatmentresult';
import { AddtreatmentresultPage } from '../pages/Doctorpage/addtreatmentresult/addtreatmentresult';
import { FollowuptreatmentresultPage } from '../pages/Doctorpage/followuptreatmentresult/followuptreatmentresult';
import { EditiodineresultdetailPage } from '../pages/Doctorpage/editiodineresultdetail/editiodineresultdetail';
import { IodineresultdetailPage } from '../pages/Doctorpage/iodineresultdetail/iodineresultdetail';
import { IodineresultPage } from '../pages/Doctorpage/iodineresult/iodineresult';
import { DoctorHomePage } from '../pages/Doctorpage/doctor-home/doctor-home';
// import { LabtestresultPage } from '../pages/Nursepage/labtestresult/labtestresult';
// import { AddlabtestPage } from './../pages/Nursepage/addlabtest/addlabtest';
import { LabtestresultPage } from '../pages/Nursepage/ผลการตรวจทางห้องแลป/labtestresult/labtestresult';
import { AddlabtestPage } from '../pages/Nursepage/ผลการตรวจทางห้องแลป/addlabtest/addlabtest';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

// import { File } from '@ionic-native/file';
import {Md5} from 'ts-md5/dist/md5';

import { AppointmentPage } from "../pages/Nursepage/appointment/appointment";
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/Storage';

import { AboutPage } from "../pages/Homepage/about/about";
import { ContactPage } from "../pages/Homepage/contact/contact";
import { HomePage } from "../pages/Homepage/home/home";
import { TabsPage } from "../pages/tabs/tabs";
import { LoginPage } from "../pages/Homepage/login/login";
import { RegisterPage } from "../pages/Nursepage/register/register";
import { NurseHomePage } from "../pages/Nursepage/nurse-home/nurse-home";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { RegisterProvider } from "../providers/register/register";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegistersPage } from "../pages/Nursepage/registers/registers";
import { ToxinthyPage} from "../pages/Nursepage/ข้อมูลด้านสุขภาพ/toxinthy/toxinthy";
import { AgreePage} from "../pages/Nursepage/ข้อมูลด้านสุขภาพ/agree/agree";
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

// //Nurse Page//
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

// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// import { File } from '@ionic-native/file';
// import { Camera } from '@ionic-native/camera';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { HttpClientModule } from '@angular/common/http';

moment
import { EatfoodPage} from '../pages/Nursepage/ขั้นตอนการเตรียมตัว/eatfood/eatfood';
import { NofoodPage} from '../pages/Nursepage/ขั้นตอนการเตรียมตัว/nofood/nofood';
import {InsertPage} from '../pages/Nursepage/insert/insert';

import { PatientHomePage } from '../pages/Patientpage/patient-home/patient-home';

import { AdminhomePage } from '../pages/AdminPage/adminhome/adminhome';
import { DatauserPage } from '../pages/AdminPage/datauser/datauser';
import { DatahosPage } from '../pages/AdminPage/datahos/datahos';
import { DdPage } from '../pages/AdminPage/dd/dd';
import { DpPage } from '../pages/AdminPage/dp/dp';
import { DnPage } from '../pages/AdminPage/dn/dn';
import { AdddatauserPage } from '../pages/AdminPage/adddatauser/adddatauser';
import { AddhosPage } from '../pages/AdminPage/addhos/addhos';

import {  QrcodePage } from '../pages/qrscan/qrscan';
import {  GenPage } from '../pages/gen/gen';
import { GlobalProvider } from '../providers/global/global';


import { FilePath } from '@ionic-native/file-path';
import { FileOpener } from '@ionic-native/file-opener';
import { FileChooser } from '@ionic-native/file-chooser';
import { AutosizeModule } from 'ngx-autosize';

import { YoutubePipe } from '../pipes/youtube/youtube'
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
    RegistersPage,
    NurseHomePage,
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
    // DocBiopsyPage,
    // DocDiagnosticResultPage,
    // DocEditPage,
    // DocEditbiopsyPage,
    // DocEditlabPage,
    // DocEditphysicalPage,
    // DocEditphysicalsPage,
    // DocExaminationPage,
    // DocLabPage,
    // DocPhysicalPage,
    // DocPhysicalsPage,
    // DocRadiographicPage,
    // DocRadiographicsPage,
    // DocTestresultPage,
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
    QrcodePage,
    AdddatauserPage,
    EatfoodPage,
    NofoodPage,
    AppointmentPage,
    GenPage,
    AddhosPage,
    InsertPage,
    YoutubePipe


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AutosizeModule,
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
    RegistersPage,
    NurseHomePage,
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
    // DocBiopsyPage,
    // DocDiagnosticResultPage,
    // DocEditPage,
    // DocEditbiopsyPage,
    // DocEditlabPage,
    // DocEditphysicalPage,
    // DocEditphysicalsPage,
    // DocExaminationPage,
    // DocLabPage,
    // DocPhysicalPage,
    // DocPhysicalsPage,
    // DocRadiographicPage,
    // DocRadiographicsPage,
    // DocTestresultPage,
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
    QrcodePage,
    AdddatauserPage,
    EatfoodPage,
    NofoodPage,
    AppointmentPage,
    GenPage,
    AddhosPage,
    InsertPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RegisterProvider,
    GlobalProvider,
    BarcodeScanner,
    FileTransfer,
    File,
    Camera,
    IonicStorageModule,


    FileTransfer,
    // FileUploadOptions,
    FileTransferObject,
    File,
    Camera,
    BarcodeScanner,
    IonicStorageModule,
    GlobalProvider,
    Md5,
    FilePath,
    FileOpener,
    FileChooser
  ]
})

export class AppModule {}

