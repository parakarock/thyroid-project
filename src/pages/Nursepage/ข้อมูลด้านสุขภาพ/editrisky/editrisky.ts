import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditriskyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editrisky',
  templateUrl: 'editrisky.html',
})
export class EditriskyPage {

  strain:String;
  HardWork:String;
  nighttimework:String;
  Around:String;
  overtime:String;
  round:String;
  SleepLess:String;
  Pregnant:String;
  toxin:String;
  cigarettes:String;
  specify:String;
  perday:String;
  duration:String;
  yearmonth:String;
  stopsmoking:String;
  NoFactor:String;
  PoisonousRelative:String;
  Workingrelatives:String;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditriskyPage');
  }
  do(){
    let body = JSON.stringify({

      strain: this.strain,
      HardWork: this.HardWork,
      nighttimework: this.nighttimework,
      Around: this.Around,
      overtime: this.overtime,
      round: this.round,
      SleepLess: this.SleepLess,
      Pregnant: this.Pregnant,
      toxin: this.toxin,
      cigarettes: this.cigarettes,
      specify: this.specify,
      perday: this.perday,
      duration: this.duration,
      yearmonth: this.yearmonth,
      stopsmoking: this.stopsmoking,
      NoFactor: this.NoFactor,
      PoisonousRelative: this.PoisonousRelative,
      Workingrelatives: this.Workingrelatives
    });
  }
}
