import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddlabtestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addlabtest',
  templateUrl: 'addlabtest.html',
})
export class AddlabtestPage {
  Date:string;
  Hospital:string;
  SerumT3:number;
  SerumT4:number;
  SerumTSH:number;
  SerumTRAb:number;
  ThyroidMed:string;
  ThyroidMedVol:number;
  ThyroidMedRoundPerDay:number;
  ThyroidMedEtc:string;
  BetaBlock:string;
  BetaBlockVol:number;
  BetaBlockRoundPerDay:number;
  BetaBlockEtc:string;


  public hospital:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.hospital =[
      {
        HosName: "โรงพยาบาลมหาวิทยาลัยบูรพา",
        id: 1
      },
      {
        HosName: "โรงพยาบาลเอกชล 2",
        id: 2
      },
      {
        HosName: "โรงพยาบาลกรุงเทพพัทยา",
        id: 3
      },
      {
        HosName: "โรงพยาบาลสมิติเวช",
        id: 4
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddlabtestPage');
  }

  body = JSON.stringify({
    hos:this.Hospital,
    t3:this.SerumT3,
    t4:this.SerumT4,
    tsh:this.SerumTSH,
    trab:this.SerumTRAb,
    thymed:this.ThyroidMed,
    thyvol:this.ThyroidMedVol,
    thyrou:this.ThyroidMedRoundPerDay,
    beta:this.BetaBlock,
    betavol:this.BetaBlockVol,
    betarou:this.BetaBlockRoundPerDay
 });

 do(){
    alert(this.Hospital)
  }


}
