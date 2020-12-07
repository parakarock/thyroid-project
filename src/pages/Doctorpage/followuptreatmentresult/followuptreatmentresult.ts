import { EdittreatmentresultPage } from '../edittreatmentresult/edittreatmentresult';
import { AddtreatmentresultPage } from '../addtreatmentresult/addtreatmentresult';
import { ShowtreatmentdetailPage } from '../showtreatmentdetail/showtreatmentdetail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../../providers/global/global";
import {
  Http,
  Headers,
  RequestOptions
} from "@angular/http";
import moment from 'moment';
import 'moment/locale/TH';


@IonicPage()
@Component({
  selector: 'page-followuptreatmentresult',
  templateUrl: 'followuptreatmentresult.html',
})
export class FollowuptreatmentresultPage {
  showData: boolean = true;
  showMore: boolean = false;
  ButtonShow: boolean = true;
  items;
  shownGroup = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalProvider, private http: Http) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowuptreatmentresultPage');
  }
  ionViewWillEnter(){
    this.isPatient()
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = {
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound()
    };
      this.http
        .post(
          "https://"+this.global.getIP()+"/pantient-follow.php?method=get_follow&role="+this.global.getSelectRole(),
          body,
          options
        )
        .map(res => res.json())
        .subscribe(
          data => {
            if(data.result){
              this.showData = false;
            }else{
              this.showData = true;
              for(let i = 0;i < data.length; i++){
                data[i].pa_fol_date = moment(data[i].pa_fol_date,"YYYY-MM-DD").format("Do MMMM YYYY")
              }
              this.items = data;
              this.showMore = false;
              console.log(JSON.stringify(data))
            }
          },
          error => {
            console.log(error);
          }
        );
  }

  onClickAddLabTest(){
    this.navCtrl.push(AddtreatmentresultPage);
  }

  onClickEditLabTest(id){
    this.navCtrl.push(EdittreatmentresultPage,this.items[id]);
  }
  showFollowResult(id){
    this.navCtrl.push(ShowtreatmentdetailPage,this.items[id])
  }
  ShowMore(){
    this.showMore = !this.showMore
  }
  isShowMore(){
    return this.showMore
  }
  isPatient(){
    if(this.global.getSelectRole() == 'ผู้ป่วย'){
      this.ButtonShow = false
    }
  }

}
