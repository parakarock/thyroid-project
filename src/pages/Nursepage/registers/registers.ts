import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";

/**
 * Generated class for the RegistersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registers',
  templateUrl: 'registers.html',
})
export class RegistersPage {

  // formgroup: FormGroup;
  // hn:AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  //   this.formgroup = formBuilder.group({
  //     hn: ['', Validators.required]
    
     
  //   });
  //  this.hn = this.formgroup.controls['hn'];
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistersPage');
  }
//   doSignup(){
//     console.log(this.formgroup.value);
//     console.log(this.formgroup.valid);   
// }
}
