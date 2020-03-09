import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { GeneralPage } from '../general/general';
import { InitiallyPage } from '../initially/initially';
import { RiskyPage } from '../risky/risky';
import { TabooPage } from '../taboo/taboo';
import { HistoryPage } from '../history/history';
import { ToxinthyPage } from '../toxinthy/toxinthy';
import { AgreePage } from '../agree/agree';
import { NurseHomePage } from '../../nurse-home/nurse-home';


/**
 * Generated class for the HealthdatahomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-healthdatahome',
  templateUrl: 'healthdatahome.html',
})
export class HealthdatahomePage {
  Root1: any;
  Root2: any;
  Root3: any;
  Root4: any;
  Root5: any;
  Root6: any;
  Root7: any;

public show:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams ,public events: Events) {
    events.subscribe('user:patient', () => {
      this.Root1 = GeneralPage;
      this.Root2 = InitiallyPage;
      this.Root3 = RiskyPage; 
      this.Root4 = TabooPage; 
      this.Root5 = HistoryPage; 
      this.Root6 = ToxinthyPage; 
      this.Root7 = AgreePage; 
      this.show = true;
    });
    events.subscribe('user:nurse', () => {
      this.Root1 = GeneralPage;
      this.Root2 = InitiallyPage;
      this.Root3 = RiskyPage; 
      this.Root4 = TabooPage; 
      this.Root5 = HistoryPage; 
      this.Root6 = ToxinthyPage; 
      this.Root7 = AgreePage; 
      this.show = false;
    });
    events.subscribe('user:doctor', () => {
      this.Root1 = GeneralPage;
      this.Root2 = InitiallyPage;
      this.Root3 = RiskyPage; 
      this.Root4 = TabooPage; 
      this.Root5 = HistoryPage; 
      this.Root6 = ToxinthyPage; 
      this.Root7 = AgreePage; 
      this.show = true;
    });
   
  
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthdatahomePage');
  }
  general(){
    this.navCtrl.push(GeneralPage)
  }
  initially(){
    this.navCtrl.push(InitiallyPage)
  }
  risky(){
    this.navCtrl.push(RiskyPage)
  }
  taboo(){
    this.navCtrl.push(TabooPage)
  }
  history(){
    this.navCtrl.push(HistoryPage)
  }
  toxin(){
    this.navCtrl.push(ToxinthyPage)
  }
  agree(){
    this.navCtrl.push(AgreePage)
  }

}
