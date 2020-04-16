import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/interval"
/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  public mydate: string = "2020-03-02";
  public role: any; //สถานะ[] คน login
  public name: string; //ชื่อคน login
  public selectRole; //role คน login ที่เลือก

  public patientID: string = "123456"; //ปปช. ผู้ป่วย
  private patientName: string; //ชื่อ ผู้ป่วย
  public round: any; //รอบ[] ผู้ป่วย
  public selectRound = 1; //เลือก รอบ
  public sex:string; //เพศผู้ป่วย

  private showMenuMain:boolean =false;


  timeVar;
  timeVal;
  public using:boolean = false;
  private ip = "192.168.31.98:8000" //ip API
  constructor() {
    console.log("Hello GlobalProvider Provider");
  }

  getname() {
    return this.name;
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
  setSex(sex){
    this.sex = sex;
  }
  getSex(){
    return this.sex;
  }
  setSelectRole(role){
    this.selectRole = role;
  }
  getSelectRole(){
    return this.selectRole;
  }
  setSelectRound(Round){
    this.selectRound = Round;
  }
  getSelectRound(){
    return this.selectRound;
  }
  setShowMenuMain(show:boolean){
    this.showMenuMain = show;
  }
  getShowMenuMain(){
    return this.showMenuMain;
  }


  startTimer(){
    this.using = true;
    this.timeVar = Observable.interval(1000).subscribe( x => {
      if(x == 20){
        this.timeVar.unsubscribe();
        this.using = false;
      }
    })
  }

  getIP(){
    return this.ip;
  }

  checkCanUse(){
    return this.using;
  }
  getdate() {
    return this.mydate;
  }

}
