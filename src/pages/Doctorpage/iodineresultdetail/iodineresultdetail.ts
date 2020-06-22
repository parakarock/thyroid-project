import { EditiodineresultdetailPage } from "../editiodineresultdetail/editiodineresultdetail";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { GlobalProvider } from "../../../providers/global/global";
import { Http, Headers, RequestOptions } from "@angular/http";
import moment from "moment";
import "moment/locale/TH";

/**
 * Generated class for the IodineresultdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-iodineresultdetail",
  templateUrl: "iodineresultdetail.html",
})
export class IodineresultdetailPage {
  date;
  thysize;
  TT3orfT3;
  fT4;
  TSH;
  thyMed;
  thyAmount
  thyDaily
  betaBlock;
  betaAmount;
  betaDaily
  ButtonShow: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider,
    public http: Http
  ) {
    
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad IodineresultdetailPage");
  }
  isPatient(){
    if(this.global.getSelectRole() == 'ผู้ป่วย'){
      this.ButtonShow = false
    }
  }
  ionViewWillEnter(){
    this.isPatient()
    if(this.navParams.get('formData')){
      this.date = moment(this.navParams.get('formData').pa_fol_date,"YYYY-MM-DD").format("Do MMMM YYYY")
    this.thysize = this.navParams.get('formData').pa_fol_result
    this.TT3orfT3 = this.navParams.get('formData').ttf3_tt3
    this.fT4 = this.navParams.get('formData').fT4_result
    this.TSH = this.navParams.get('formData').TSH_result
    this.thyMed = this.navParams.get('formData').pa_fol_anti
    this.thyAmount = this.navParams.get('formData').pa_fol_anti_amount
    this.thyDaily = this.navParams.get('formData').pa_fol_anti_daily
    this.betaBlock = this.navParams.get('formData').pa_fol_beta
    this.betaAmount = this.navParams.get('formData').pa_fol_beta_amount
    this.betaDaily = this.navParams.get('formData').pa_fol_beta_daily
    }else{
    this.date = moment(this.navParams.get('pa_fol_date'),"YYYY-MM-DD").format("Do MMMM YYYY")
    this.thysize = this.navParams.get('pa_fol_result')
    this.TT3orfT3 = this.navParams.get('ttf3_tt3')
    this.fT4 = this.navParams.get('fT4_result')
    this.TSH = this.navParams.get('TSH_result')
    this.thyMed = this.navParams.get('pa_fol_anti')
    this.thyAmount = this.navParams.get('pa_fol_anti_amount')
    this.thyDaily = this.navParams.get('pa_fol_anti_daily')
    this.betaBlock = this.navParams.get('pa_fol_beta')
    this.betaAmount = this.navParams.get('pa_fol_beta_amount')
    this.betaDaily = this.navParams.get('pa_fol_beta_daily')
    }
    
  }

  EditResultDetail() {
    this.navCtrl.push(EditiodineresultdetailPage,{
      follow_id:this.navParams.get('follow_id'),
      pa_fol_date:this.date,
      pa_fol_result:this.thysize,
      ttf3_tt3:this.TT3orfT3,
      fT4_result:this.fT4,
      TSH_result:this.TSH,
      pa_fol_anti:this.thyMed,
      pa_fol_anti_amount:this.thyAmount,
      pa_fol_anti_daily:this.thyDaily,
      pa_fol_beta:this.betaBlock,
      pa_fol_beta_amount:this.betaAmount,
      pa_fol_beta_daily:this.betaDaily
    });
  }
}
