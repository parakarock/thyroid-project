import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { GeneralPage } from "../general/general";
import { InitiallyPage } from "../initially/initially";
import { RiskyPage } from "../risky/risky";
import { TabooPage } from "../taboo/taboo";
import { HistoryPage } from "../history/history";
import { ToxinthyPage } from "../toxinthy/toxinthy";
import { AgreePage } from "../agree/agree";
import { NurseHomePage } from "../../nurse-home/nurse-home";
import { GlobalProvider } from "../../../../providers/global/global";

/**
 * Generated class for the HealthdatahomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-healthdatahome",
  templateUrl: "healthdatahome.html"
})
export class HealthdatahomePage {
  
  roles;
  name;
  status: string;
  number;
  rounds;
  showMenu:boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider,
    public events: Events
  ) {
   
    if(this.global.getSelectRole() === "nurse"){
      this.showMenu = true;
    }else{
      this.showMenu = false;
    }
  }
  ionViewDidLoad() {
   
    console.log("global round :"+this.global.getRound());
    console.log("id :"+this.global.getpatientID());
    console.log("ionViewDidLoad HealthdatahomePage");
  }
  
  general() {
    this.navCtrl.push(GeneralPage);
  }
  initially() {
    this.navCtrl.push(InitiallyPage);
  }
  risky() {
    this.navCtrl.push(RiskyPage);
  }
  taboo() {
    this.navCtrl.push(TabooPage);
  }
  history() {
    this.navCtrl.push(HistoryPage);
  }
  toxin() {
    this.navCtrl.push(ToxinthyPage);
  }
  agree() {
    this.navCtrl.push(AgreePage);
  }


  selectRound() {
   console.log("number :"+this.number);
  }
}
