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
  public role: any;
  public name: string;

  public patientID: string;
  public round: any;
  public selectRound;

  timeVar;
  timeVal;
  public using:boolean = false;
  constructor() {
    console.log("Hello GlobalProvider Provider");
    this.selectRound=1;
  }
  
  getname() {
    return this.name;
  }
  getrole() {
    return this.role;
  }
  getpatientID() {
    return this.patientID;
  }
  getround() {
    return this.round;
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
  checkCanUse(){
    return this.using;
  }
}
