import { Injectable } from "@angular/core";

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
  constructor() {
    console.log("Hello GlobalProvider Provider");
    this.selectRound = 1;
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
}
