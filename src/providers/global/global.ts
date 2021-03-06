import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/interval";
/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  private appoint_date: string;
  private role: any; //สถานะ[] คน login
  private name: string; //ชื่อคน login
  private loginID: string; //idcard คน login
  private selectRole; //role คน login ที่เลือก
  private sexLogin; //เพศ คน login

  public patientID: string; //ปปช. ผู้ป่วย
  private patientName: string; //ชื่อ ผู้ป่วย
  private round: any; //รอบ[] ผู้ป่วย
  private selectRound = 1; //เลือก รอบ
  private sex: string; //เพศผู้ป่วย

  private showMenuMain: boolean = false;

  timeVar;
  timeVal;
  public using: boolean = false;
  // private ip = "10.80.6.120:8000"; // Informatics Server
  private ip = "www.informatics.buu.ac.th/thyroid";
  // private url = "https://www.informatics.buu.ac.th/thyroid"
  constructor() {
    console.log("Hello GlobalProvider Provider");
  }
  setname(name) {
    this.name = name;
  }
  getname() {
    return this.name;
  }
  setrole(role) {
    this.role = role;
  }
  getrole() {
    return this.role;
  }
  setpatientID(idcard) {
    this.patientID = idcard;
  }
  getpatientID() {
    return this.patientID;
  }
  setpatientName(fullname) {
    this.patientName = fullname;
  }
  getpatientName() {
    return this.patientName;
  }
  setRound(rou) {
    this.round = rou;
  }
  getRound() {
    return this.round;
  }
  setSex(sex) {
    this.sex = sex;
  }
  getSex() {
    return this.sex;
  }
  setSelectRole(role) {
    this.selectRole = role;
  }
  getSelectRole() {
    return this.selectRole;
  }
  setSelectRound(Round) {
    this.selectRound = Round;
  }
  getSelectRound() {
    return this.selectRound;
  }
  setShowMenuMain(show: boolean) {
    this.showMenuMain = show;
  }
  getShowMenuMain() {
    return this.showMenuMain;
  }
  setLoginID(idcard) {
    this.loginID = idcard;
  }
  getLoginID() {
    return this.loginID;
  }

  startTimer() {
    this.using = true;
    this.timeVar = Observable.interval(1000).subscribe((x) => {
      if (x == 20) {
        this.timeVar.unsubscribe();
        this.using = false;
      }
    });
  }

  getIP() {
    return this.ip;
  }

  checkCanUse() {
    return this.using;
  }
  setdate(date) {
    this.appoint_date = date;
  }
  getdate() {
    return this.appoint_date;
  }
  setSexLogin(gender) {
    this.sexLogin = gender;
  }
  getSexLogin() {
    return this.sexLogin;
  }
}
