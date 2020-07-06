import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { GlobalProvider } from "../../../../providers/global/global";
import {
  Http,
  Headers,
  RequestOptions
} from "@angular/http";
import moment from 'moment';
import { FormGroup, FormBuilder, Validators, RequiredValidator } from "@angular/forms";
import 'moment/locale/TH';

/**
 * Generated class for the EditlabtestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editlabtest',
  templateUrl: 'editlabtest.html',
})
export class EditlabtestPage {
  date:string = this.navParams.get("lab_date")
  hospitals;
  showNameHosIn:boolean =false;
  showAntiOther:boolean =false;
  showBlockOther:boolean =false;
  showAntiPill:boolean =true;
  showBlockPill:boolean =true;
  formgroup: FormGroup;
  antinames = [
    {
      name: "Propylthiouracil (PTU)",
    },
    {
      name: "Methimazole (MMI)",
    },
    {
      name: "Tapazole",
    },
    {
      name: "Lithium",
    },
    {
      name: "ไม่ต้องรับประทาน"
    },
    {
      name: "อื่นๆ"
    }
  ];
  betanames= [
    {
      name: "Propranolol (10)",
    },
    {
      name: "Propranolol (40)",
    },
    {
      name: "Betalol (10)",
    },
    {
      name: "Atenolol (50)",
    },
    {
      name: "ไม่ต้องรับประทาน"
    },
    {
      name: "อื่นๆ"
    }
  ];

  Hospital;
  HospitalOther;
  SerumT3:number;
  SerumT4:number;
  SerumTSH:number;
  SerumTRAb:number;
  SerumT3st:number;
  SerumT4st:number;
  SerumTSHst:number;
  SerumTRAbst:number;
  ThyroidMed:string;
  ThyroidMedVol:number;
  ThyroidMedRoundPerDay:number;
  ThyroidMedEtc:string;
  BetaBlock:string;
  BetaBlockVol:number;
  BetaBlockRoundPerDay:number;
  BetaBlockEtc:string;


  public hospital:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,
    public global: GlobalProvider,
    public http: Http,
    public alertCtrl: AlertController) {

      this.formgroup = formBuilder.group({
        Hospital: [
          "",
          Validators.compose([Validators.required, Validators.pattern("^[ก-๏sa-zA-Z0-9]+$")])
        ],
        HospitalOther: ["",Validators.pattern("^[ก-๏sa-zA-Z0-9]+$")],
        SerumT3: [navParams.get("free_T3"),Validators.required],
        SerumT4: [navParams.get("free_T4"),Validators.required],
        SerumTSH: [navParams.get("TSH"),Validators.required],
        SerumTRAb: [navParams.get("TRAb"),Validators.required],
        SerumT3st: ["",],
        SerumT4st: ["",],
        SerumTSHst: ["",],
        SerumTRAbst: ["",],
        ThyroidMed: ["",Validators.required],
        ThyroidMedVol: [navParams.get("anit_thyroid_amount"),],
        ThyroidMedRoundPerDay: [navParams.get("anit_thyroid_daily"),],
        ThyroidMedEtc: ["",],
        BetaBlock: ["",Validators.required],
        BetaBlockVol: [navParams.get("beta_block_amount"),],
        BetaBlockRoundPerDay: [navParams.get("beta_block_daily"),],
        BetaBlockEtc: ["",]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddlabtestPage');
    this.getHospital()
    this.setMedical()
  }

  

 addLabTest(){
  let hosnameother:string = this.formgroup.controls.HospitalOther.value
  let hosname = this.formgroup.controls.Hospital.value
  let anti:string = this.formgroup.controls.ThyroidMed.value
  let antiother:string = this.formgroup.controls.ThyroidMedEtc.value
  let antiMedVol:number = this.formgroup.controls.ThyroidMedVol.value
  let antiMedPerday:number = this.formgroup.controls.ThyroidMedRoundPerDay.value
  let block:string = this.formgroup.controls.BetaBlock.value
  let blockother:string = this.formgroup.controls.BetaBlockEtc.value
  let blockMedVol:number = this.formgroup.controls.BetaBlockVol.value
  let blockMedPerday:number = this.formgroup.controls.BetaBlockRoundPerDay.value
  if(!hosnameother && hosname === "อื่นๆ"){
    this.presentAlert("กรุณาพิมพ์ชื่อโรงพยาบาล")
  }else if(!antiother && anti === "อื่นๆ"){
    this.presentAlert("กรุณาพิมพ์ชื่อยาต้านอาการไทรอยด์")
  }else if((!antiMedVol&&anti !== "ไม่ต้องรับประทาน") || (!antiMedPerday&&anti !== "ไม่ต้องรับประทาน")){
    this.presentAlert("กรุณาระบุปริมาณของยาต้านอาการไทรอยด์")
  }else if(!blockother && block === "อื่นๆ"){
    this.presentAlert("กรุณาพิมพ์ชื่อยา Beta-Blocker")
  }else if((!blockMedVol&&block !== "ไม่ต้องรับประทาน") || (!blockMedPerday&&block !== "ไม่ต้องรับประทาน")){
    this.presentAlert("กรุณาระบุปริมาณของยา Beta-Blocker")
  }else{
    let body = JSON.stringify({
      id_test: this.navParams.get("id_test"),
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound(),
      labdate:moment(this.date,"Do MMMM YYYY").format("YYYY-MM-DD"),
      hospital:this.sendHospital(),
      t3:this.formgroup.controls.SerumT3.value,
      t4:this.formgroup.controls.SerumT4.value,
      tsh:this.formgroup.controls.SerumTSH.value,
      trab:this.formgroup.controls.SerumTRAb.value,
      t3stan:this.formgroup.controls.SerumT3st.value,
      t4stan:this.formgroup.controls.SerumT4st.value,
      tshstan:this.formgroup.controls.SerumTSHst.value,
      trabstan:this.formgroup.controls.SerumTRAbst.value,
      antiname:this.sendThyroidMed(),
      antiamount:this.formgroup.controls.ThyroidMedVol.value,
      antidaily:this.formgroup.controls.ThyroidMedRoundPerDay.value,
      betaname:this.sendBetaBlock(),
      betaamount:this.formgroup.controls.BetaBlockVol.value,
      betadaily:this.formgroup.controls.BetaBlockRoundPerDay.value
  
   });
   console.log(body)

   let headers = new Headers({ "Content-type": "application/json" });
   let options = new RequestOptions({ headers: headers });
      this.http
        .post(
          "http://"+this.global.getIP()+"/labtest.php?method=update_labtest&role="+this.global.getSelectRole(),
          body,
          options
        )
        .map(res => res.json())
        .subscribe(
          data => {
            this.presentAlert(data.result)
            if(data.result !== "Fail"){
              this.navCtrl.pop();
            } 
          },
          error => {
            console.log(error);
          }
        );
  }

  
  }


  alertHospital(){
    let hosname = this.formgroup.controls.Hospital.value
    if(hosname === "อื่นๆ") {
      this.showNameHosIn = true;
    } else {
      this.showNameHosIn = false;
    }
  }
  setMedical(){
    let anti = this.navParams.get("anti_thy_name")
    let beta = this.navParams.get("beta_thy_name")
    this.formgroup.controls.ThyroidMed.setValue(anti)
    this.formgroup.controls.BetaBlock.setValue(beta)
    if(this.antinames.find(names => names.name === anti)){

    }else{
      this.antinames.unshift({
        name: anti
      })
    }
    if(this.betanames.find(names => names.name === beta)){

    }else{
      this.betanames.unshift({
        name: beta
      })
    }
    this.addThyroidMed(anti)
    this.addBetaBlock(beta)
  }
  getHospital() {
    this.http
      .get(
        "http://"+this.global.getIP()+"/admin.php?method=get_hospital&role="+this.global.getSelectRole()
      )
      .map(res => res.json())
      .subscribe(
        data => {
          let hos = this.navParams.get("Lab_test_hosp")
          this.hospitals = data;
            if(data.find(hospital => hospital.hos_name === hos)){
      
            }else{
              this.hospitals.unshift({
                hos_name: hos,
                freeT3_standard: this.navParams.get("free_T3_stan"),
                freeT4_standard: this.navParams.get("free_T4_stan"),
                TSH_standard: this.navParams.get("TSH_stan"),
                TRAb_standard: this.navParams.get("TRAb_stan"),
              }); 
            
            }
          this.formgroup.controls.Hospital.setValue(hos)
          this.addOtherItem(this.hospitals);
          this.showHosIn() 
        },
        error => {
          console.log(error);
        }
      );
  }
  addOtherItem(arr) {
    arr.push({
      hos_name: "อื่นๆ"
    });
  }
  showHosIn() {
    let hosname = this.formgroup.controls.Hospital.value
    if(hosname === "อื่นๆ") {
      this.showNameHosIn = true;
    } else {
      this.showNameHosIn = false;
    }
    if(hosname !== "กรุณาเลือก"){
      var array = this.hospitals.find((key) => key.hos_name === hosname)
      this.formgroup.controls.SerumT3st.setValue(array.freeT3_standard)
      this.formgroup.controls.SerumT4st.setValue(array.freeT4_standard)
      this.formgroup.controls.SerumTSHst.setValue(array.TSH_standard)
      this.formgroup.controls.SerumTRAbst.setValue(array.TRAb_standard)
      }else{
      this.formgroup.controls.SerumT3st.setValue(null)
      this.formgroup.controls.SerumT4st.setValue(null)
      this.formgroup.controls.SerumTSHst.setValue(null)
      this.formgroup.controls.SerumTRAbst.setValue(null)
      }
  }
  sendHospital(){
    let hosname:string = this.formgroup.controls.Hospital.value
    if(hosname === "อื่นๆ") {
      return this.formgroup.controls.HospitalOther.value
    } else {
     return this.formgroup.controls.Hospital.value
    }
  }
  sendBetaBlock(){
    let block:string = this.formgroup.controls.BetaBlock.value
    if(block === "อื่นๆ") {
      return this.formgroup.controls.BetaBlockEtc.value
    } else {
     return this.formgroup.controls.BetaBlock.value
    }
  }
  sendThyroidMed(){
    let anti:string = this.formgroup.controls.ThyroidMed.value
    if(anti === "อื่นๆ") {
      return this.formgroup.controls.ThyroidMedEtc.value
    } else {
     return this.formgroup.controls.ThyroidMed.value
    }
  }
  addThyroidMed(data){
    if(data === "อื่นๆ"){
    this.showAntiOther = true
    this.showAntiPill = true    
    }else if(data === "ไม่ต้องรับประทาน"){
      this.showAntiPill = false
      this.showAntiOther = false
      this.formgroup.controls.ThyroidMedVol.setValue(null)
      this.formgroup.controls.ThyroidMedRoundPerDay.setValue(null)
    }else{
      this.showAntiPill = true
      this.showAntiOther = false
      this.ThyroidMed = data;
    }
  
  }
  addBetaBlock(data){
    if(data === "อื่นๆ"){
      this.showBlockOther = true
      this.showBlockPill = true
    }else if(data === "ไม่ต้องรับประทาน"){
      this.showBlockPill = false
      this.showBlockOther = false
      this.formgroup.controls.BetaBlockVol.setValue(null)
      this.formgroup.controls.BetaBlockRoundPerDay.setValue(null)
    }else{
      this.showBlockPill = true
      this.showBlockOther = false
      this.BetaBlock = data;
    }
  
  }
  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      title: "ยืนยันการแก้ไขข้อมูล",
      message: "",
      buttons: [
        {
          text: "ยกเลิก",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "ยืนยัน",
          handler: () => {
            this.addLabTest();
          }
        }
      ]
    });
    alert.present();
  }

  async presentAlert(txt: string) {
    let alert = await this.alertCtrl.create({
      title: 'การแจ้งเตือน',
      subTitle: txt,
      buttons: ['Ok']
    });
    alert.present();
  }
}
