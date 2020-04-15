import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EdittreatmentresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edittreatmentresult',
  templateUrl: 'edittreatmentresult.html',
})
export class EdittreatmentresultPage {
  thairoid:string;
  thairoid2:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EdittreatmentresultPage');
    document.getElementById("ThyroidMedEtc").style.visibility = "hidden";
    document.getElementById("BetaBlockEtc").style.visibility = "hidden";
  }
  myFunction(){
    if(this.thairoid=="อื่นๆ"){
      // this.ThyroidMedEtc.style.visibility = "hidden";
      document.getElementById("ThyroidMedEtc").style.visibility = "visible"; 
      
    }else{
      document.getElementById("ThyroidMedEtc").style.visibility = "hidden";
    }
    
  }

  myFunction2(){
    if(this.thairoid2=="อื่นๆ"){
      // this.ThyroidMedEtc.style.visibility = "hidden";
      document.getElementById("BetaBlockEtc").style.visibility = "visible"; 
      
    }else{
      document.getElementById("BetaBlockEtc").style.visibility = "hidden";
    }
    
  }
}
