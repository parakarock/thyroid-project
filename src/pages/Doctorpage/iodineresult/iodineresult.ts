import { IodineresultdetailPage } from "../iodineresultdetail/iodineresultdetail";
import { EditiodineresultdetailPage } from "../editiodineresultdetail/editiodineresultdetail";
import { AddiodineresultPage } from '../addiodineresult/addiodineresult'
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { GlobalProvider } from "../../../providers/global/global";
import { Http, Headers, RequestOptions } from "@angular/http";
import moment from "moment";
import "moment/locale/TH";

@IonicPage()
@Component({
  selector: "page-iodineresult",
  templateUrl: "iodineresult.html",
})
export class IodineresultPage {
  data;
  data1: string
  data2: string
  data3: string
  data4: string
  iodine_result:string
  volume_result:number
  volumeButton:boolean
  iodineButton:boolean
  doctorRole:boolean
  date:string
  method:string
  round
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider,
    public http: Http,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad IodineresultPage");
  }
  ionViewWillEnter() {
    this.getData1();
    this.getData2();
    this.isDoctor()
  }
  
  isDoctor(){
    if(this.global.getSelectRole() == 'หมอ'){
      this.doctorRole = true
    }else{
      this.doctorRole = false
    }
  }
  onClickIodineDetail(id) {
    if(this.data){
      if (this.data.find((indexs) => indexs.index === id)) {
        console.log(JSON.stringify(this.data[id-1]))
        this.navCtrl.push(IodineresultdetailPage,this.data[id-1]);
     } else {
       if (this.data.find((indexs) => indexs.index === id-1)&&this.volume_result){
         this.navCtrl.push(AddiodineresultPage);
       }else{
         this.presentAlert("ยังไม่ได้บันทึกข้อมูลก่อนหน้า");
       }
     }
    }else{
      if(id === 1){
        this.navCtrl.push(AddiodineresultPage);
      }else{
        this.presentAlert("ยังไม่ได้บันทึกข้อมูลก่อนหน้า");
      }
    }
    
   
  }
  
  getData1() {
    let body = JSON.stringify({
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound(),
    });
    console.log(body);

    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    this.http
      .post(
        "http://" +
          this.global.getIP() +
          "/pantient-follow.php?method=get_iodine&role=" +
          this.global.getSelectRole(),
        body,
        options
      )
      .map((res) => res.json())
      .subscribe(
        (data) => {
          if (data.result !== "Fail") {
            this.data = data;
            this.data1 = this.setButton(1);
            this.data2 = this.setButton(2);
            this.data3 = this.setButton(3);
            this.data4 = this.setButton(4);
          } else {
            this.data1 = "ยังไม่ได้บันทึกผล";
            this.data2 = "ยังไม่ได้บันทึกผล";
            this.data3 = "ยังไม่ได้บันทึกผล";
            this.data4 = "ยังไม่ได้บันทึกผล";
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getData2(){
    let body = JSON.stringify({
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound(),
    });
    console.log(body);

    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    this.http
      .post(
        "http://" +
          this.global.getIP() +
          "/pantient-follow.php?method=get_summary&role=" +
          this.global.getSelectRole(),
        body,
        options
      )
      .map((res) => res.json())
      .subscribe(
        (data) => {
          if (data.result !== "Fail") {
            if(data.volume_result){
              this.volume_result = data.volume_result
              this.volumeButton = false
            }else{
              this.volume_result = null
              this.volumeButton = true
            }
            if(data.iodine_result){
              this.iodine_result = data.iodine_result
              this.iodineButton = false
            }else{
              this.iodine_result = "สำเร็จแบบการทำงานของไทรอยด์ปกติ"
              this.iodineButton = true
            }
            if(data.end_date){
              this.date =  moment(data.end_date,"YYYY-MM-DD").format("DD/MM/YYYY")
              this.method =  data.method
            }else if(data.prep_date){
              this.date =  moment(data.prep_date,"YYYY-MM-DD").format("DD/MM/YYYY")
              this.method = data.method
            }else{
              this.date = "ยังไม่ได้นัด"
            }
           this.round = this.global.getSelectRound()
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  async presentAlert(txt: string) {
    let alert = await this.alertCtrl.create({
      title: "การแจ้งเตือน",
      subTitle: txt,
      buttons: ["Ok"],
    });
    alert.present();
  }
  setButton(number) {
    if (this.data.find((indexs) => indexs.index === number)) {
      return  moment(this.data[number-1].pa_fol_date,"YYYY-MM-DD").format("DD/MM/YYYY")
    } else {
      return "ยังไม่ได้บันทึกผล";
    }
  }

  summary(){
    if(this.data){
      if(this.data.length >= 4){
        let body = JSON.stringify({
          idcard: this.global.getpatientID(),
          round: this.global.getSelectRound(),
          iodine_result:this.iodine_result
        });
        console.log(body);
    
        let headers = new Headers({ "Content-type": "application/json" });
        let options = new RequestOptions({ headers: headers });
        this.http
          .post(
            "http://" +
              this.global.getIP() +
              "/pantient-follow.php?method=update_follow_iodine&role=" +
              this.global.getSelectRole(),
            body,
            options
          )
          .map((res) => res.json())
          .subscribe(
            (data) => {
              this.iodineButton = false
              this.presentAlert(data.result)
              this.http
              .post(
                "http://" +
                  this.global.getIP() +
                  "/pantient-follow.php?method=insert_new_phase&role=" +
                  this.global.getSelectRole(),
                body,
                options
              )
              .map((res) => res.json())
              .subscribe(
                (data) => {
                  this.global.getRound().push({rou_id: data.roundUpdate})
                  this.presentAlert(data.result)
                },
                (error) => {
                  console.log(error);
                }
              );
            },
            (error) => {
              console.log(error);
            }
          );
         
      }else{
        this.presentAlert("ต้องบันทึกข้อมูลให้ครบก่อน")
      }
    }else{
      this.presentAlert("ต้องบันทึกข้อมูลให้ครบก่อน")
    }
    
  }
  volume(){
    if(this.data){
      if(this.data.length == 1){
        if(this.volume_result){
          let body = JSON.stringify({
            idcard: this.global.getpatientID(),
            round: this.global.getSelectRound(),
            volume_result:this.volume_result
          });
          console.log(body);
      
          let headers = new Headers({ "Content-type": "application/json" });
          let options = new RequestOptions({ headers: headers });
          this.http
            .post(
              "http://" +
                this.global.getIP() +
                "/pantient-follow.php?method=update_volume_result&role=" +
                this.global.getSelectRole(),
              body,
              options
            )
            .map((res) => res.json())
            .subscribe(
              (data) => {
                this.volumeButton = false
                this.presentAlert(data.result)
              },
              (error) => {
                console.log(error);
              }
            );
        }else{
          this.presentAlert("กรุณาระบุปริมาณแร่")
        }
        
      }else{
        this.presentAlert("ต้องบันทึกข้อมูลให้ครบก่อน")
      }
    }else{
      this.presentAlert("ต้องบันทึกข้อมูลให้ครบก่อน")
    }
  }
}
