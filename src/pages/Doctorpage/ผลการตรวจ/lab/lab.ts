import { EditlabtestPage } from '../../../Nursepage/ผลการตรวจทางห้องแลป/editlabtest/editlabtest';
import { AddlabtestPage } from '../../../Nursepage/ผลการตรวจทางห้องแลป/addlabtest/addlabtest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { EditlabPage } from '../editlab/editlab';
import { ShowlabtestPage } from '../../../Nursepage/ผลการตรวจทางห้องแลป/showlabtest/showlabtest';
import { GlobalProvider } from "../../../../providers/global/global";
import {
  Http,
  Response,
  Headers,
  ResponseOptions,
  RequestOptions
} from "@angular/http";
import moment from 'moment';
import 'moment/locale/TH';

/**
 * Generated class for the LabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lab',
  templateUrl: 'lab.html',
})
export class LabPage {
  showData: boolean = true;
  showMore: boolean = false;
  items;
  shownGroup = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,public global: GlobalProvider, private http: Http) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabtestresultPage');
  }
  ionViewWillEnter(){
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let body = {
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound()
    };
      this.http
        .post(
          "https://"+this.global.getIP()+"/labtest.php?method=get_labtest&role="+this.global.getSelectRole(),
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
                data[i].lab_date = moment(data[i].lab_date,"YYYY-MM-DD").format("Do MMMM YYYY")
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
    this.navCtrl.push(AddlabtestPage);
  }

  onClickEditLabTest(id){
    this.navCtrl.push(EditlabtestPage,this.items[id]);
  }
  ShowMore(){
    this.showMore = !this.showMore
  }
  isShowMore(){
    return this.showMore
  }
  showLabtest(id){
    this.navCtrl.push(ShowlabtestPage,this.items[id])
  }

}
