import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';


@IonicPage()
@Component({
  selector: 'page-practice',
  templateUrl: 'practice.html',
})
export class PracticePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public appLauncher: AppLauncher,public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PracticePage');
  }

  Launcher(){
    // let options:AppLauncherOptions = {
    //   // packageName: "com.a23perspective.i_risk"
    //   packageName: "com.ubercab"
    // }
    // this.appLauncher.canLaunch(options).then((launched:Boolean) => {
    //   if(launched){
    //     this.appLauncher.launch(options).then(() => {

    //     },(err)=> {
    //       alert(JSON.stringify(err));
    //     }
    //     )
    //   }else{
    //     alert("unable to launch app")
    //   }
    // },(err) =>{
    //   alert(JSON.stringify(err));
    // }
    // )
    // this.appLauncher.canLaunch(options)
    // .then((canLaunch: boolean) => console.log('Facebook is available'))
    // .catch((error: any) => console.error('Facebook is not available'));
  
    
  // const options: AppLauncherOptions = {
  // }
  
  // if(this.platform.is('android')) {
  //   options.uri = 'fb://'
  // } else {
  //   options.packageName = 'com.ubercab'
  // }
  
  // this.appLauncher.canLaunch(options)
  //   .then((canLaunch: boolean) => console.log('Facebook is available'))
  //   .catch((error: any) => console.error('Facebook is not available'));

  if (this.platform.is('mobile')) {
    let options:AppLauncherOptions = {
      // packageName: "com.a23perspective.i_risk"
      packageName: "com.ubercab"
    }
    this.appLauncher.canLaunch(options).then((launched:Boolean) => {
      if(launched){
        this.appLauncher.launch(options).then(() => {

        },(err)=> {
          alert(JSON.stringify(err));
        }
        )
      }else{
        alert("unable to launch app")
      }
    },(err) =>{
      alert(JSON.stringify(err));
    }
    )
  }else{
    console.log(this.platform.platforms());
  }
  
}
}
