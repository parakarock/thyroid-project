import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { GlobalProvider } from "../../../../providers/global/global";
import { Http, Headers, RequestOptions } from "@angular/http";
import moment from "moment";
import {
  FormGroup,
  FormBuilder,
  Validators,
  RequiredValidator,
} from "@angular/forms";
import "moment/locale/TH";

@IonicPage()
@Component({
  selector: "page-insert",
  templateUrl: "insert.html",
})
export class InsertPage {
  formgroup: FormGroup;
  showCompOther:boolean =false;
  showAntiOther:boolean =false;
  showBlockOther:boolean =false;
  showAntiPill:boolean =true;
  showBlockPill:boolean =true;
  showAllergy:boolean = true;
  showAllergyOther:boolean = false;
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
  toxics= [
    {
      name: "ไม่มี",
    },
    {
      name: "thyroid crisis",
    },
    {
      name: "thyrotoxic myopathy",
    },
    {
      name: "heart arrhythmia",
    },
    {
      name: "heart failure"
    }
  ];
  allergy= [
    {
      name: "drug allergy",
    },
    {
      name: "jaundice",
    },
    {
      name: "agranulocytosis",
    },
    {
      name: "อื่นๆ",
    }
  ];

  startMin: any;
  startMax: any;
  pages;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public global: GlobalProvider,
    public http: Http,
    public alertCtrl: AlertController
  ) {
    this.startMin = moment().add(443, "y").format("YYYY");
    this.startMax = moment().add(543, "y").format("YYYY");
    this.pages = new Array(100);
    let year = this.startMax
    for (let index = 0; index <= 100; index++) {
      this.pages[index] = year;
      year--;
    }

    this.formgroup = formBuilder.group({
        month:[navParams.get("month")||moment().format("MMMM"),],
        year:[navParams.get("year")||this.startMax,],
        Toxic:["",],
        ToxicEtc:["",],
        ThyroidMed: ["",Validators.required],
        ThyroidMedVol: [navParams.get("comp_anit_thy_amount"),],
        ThyroidMedRoundPerDay: [navParams.get("comp_anit_thy_daily"),],
        ThyroidMedEtc: ["",],
        BetaBlock: ["",Validators.required],
        BetaBlockVol: [navParams.get("comp_beta_amount"),],
        BetaBlockRoundPerDay: [navParams.get("comp_beta_daily"),],
        BetaBlockEtc: ["",],
        Allergy: ["",Validators.required],
        Drug: ["",],
        DrugEtc: ["",]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad InsertPage");

    this.setMedical()
    this.setAllery()
    this.setToxic()
  }
  showComp(txt){
    if(txt === "heart arrhythmia"){
      this.showCompOther = true;
    }else{
      this.showCompOther = false;
    }
    console.log(txt)
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
  sendAllery(){
    let allergy:string = this.formgroup.controls.Allergy.value
    if(allergy === "ระบุอาการแพ้ยา") {
      let drug:string = this.formgroup.controls.Drug.value
      if(drug === "อื่นๆ"){
        return this.formgroup.controls.DrugEtc.value
      }else{
        return this.formgroup.controls.Drug.value
      }
    } else {
     return this.formgroup.controls.Allergy.value
    }
  }
  sendToxic(){
    let toxic:string = this.formgroup.controls.Toxic.value
    if(toxic === "heart arrhythmia"){
      return this.formgroup.controls.ToxicEtc.value
    }else{
      return this.formgroup.controls.Toxic.value
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
      this.formgroup.controls.ThyroidMed.setValue(data)
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
      this.formgroup.controls.BetaBlock.setValue(data)
    }

  }
  setMedical(){
    let anti
    let beta
    if(this.navParams.get("comp_anit_thy_name")&&this.navParams.get("comp_beta_name")){
      anti = this.navParams.get("comp_anit_thy_name")
      beta = this.navParams.get("comp_beta_name")
    }else{
      anti = "Propylthiouracil (PTU)"
      beta = "Propranolol (10)"
    }


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
  setToxic(){
    let toxic
    if(this.navParams.get("comp_status")){
      toxic = this.navParams.get("comp_status")
    }else{
      toxic = "ไม่มี"
    }

    if(this.toxics.find(names => names.name === toxic)){
      this.formgroup.controls.Toxic.setValue(toxic)

    }else{
      this.formgroup.controls.Toxic.setValue("heart arrhythmia")
      this.formgroup.controls.ToxicEtc.setValue(toxic)
    }
    this.showComp(this.formgroup.controls.Toxic.value)
  }

  setAllery(){
    let allery
    if(this.navParams.get("comp_indication")){
      allery = this.navParams.get("comp_indication")
    }else{
      allery = "medical failure"
    }

    if(allery != "medical failure"&&allery != "มีภาวะแทรกซ้อนของโรค"&&allery != "Major adverse reactions to"){
      this.formgroup.controls.Allergy.setValue("ระบุอาการแพ้ยา")
      this.formgroup.controls.Drug.setValue(allery)
      this.allergy.unshift({
        name: allery
      })
    }else{
      this.formgroup.controls.Allergy.setValue(allery)
      this.formgroup.controls.Drug.setValue("drug allergy")
    }
    this.addAllery(this.formgroup.controls.Allergy.value)
    this.addDrug(this.formgroup.controls.Drug.value)
  }
  addAllery(txt){
    if(txt == "ระบุอาการแพ้ยา"){
      this.showAllergy = true
    }else{
      this.showAllergy = false
    }
  }
  addDrug(txt){
    if(txt == "อื่นๆ"){
      this.showAllergyOther = true
    }else{
      this.showAllergyOther = false
      this.formgroup.controls.DrugEtc.setValue(null)
    }
  }

  update(){
  let toxicother:string = this.formgroup.controls.ToxicEtc.value
  let toxic:string = this.formgroup.controls.Toxic.value
  let anti:string = this.formgroup.controls.ThyroidMed.value
  let antiother:string = this.formgroup.controls.ThyroidMedEtc.value
  let antiMedVol:number = this.formgroup.controls.ThyroidMedVol.value
  let antiMedPerday:number = this.formgroup.controls.ThyroidMedRoundPerDay.value
  let block:string = this.formgroup.controls.BetaBlock.value
  let blockother:string = this.formgroup.controls.BetaBlockEtc.value
  let blockMedVol:number = this.formgroup.controls.BetaBlockVol.value
  let blockMedPerday:number = this.formgroup.controls.BetaBlockRoundPerDay.value
  let drugother:string = this.formgroup.controls.DrugEtc.value
  let drug:string = this.formgroup.controls.Drug.value
  if(!toxicother && toxic === "heart arrhythmia"){
    this.presentAlert("กรุณาระบุอาการผิดปกติ")
  }else if(!antiother && anti === "อื่นๆ"){
    this.presentAlert("กรุณาพิมพ์ชื่อยาต้านอาการไทรอยด์")
  }else if((!antiMedVol&&anti !== "ไม่ต้องรับประทาน") || (!antiMedPerday&&anti !== "ไม่ต้องรับประทาน")){
    this.presentAlert("กรุณาระบุปริมาณของยาต้านอาการไทรอยด์")
  }else if(!blockother && block === "อื่นๆ"){
    this.presentAlert("กรุณาพิมพ์ชื่อยา Beta-Blocker")
  }else if((!blockMedVol&&block !== "ไม่ต้องรับประทาน") || (!blockMedPerday&&block !== "ไม่ต้องรับประทาน")){
    this.presentAlert("กรุณาระบุปริมาณของยา Beta-Blocker")
  }else if(!drugother&&drug === "อื่นๆ"){
    this.presentAlert("กรุณาระบุอาการแพ้ยา")
  }else{
    let body = {
      idcard: this.global.getpatientID(),
      round: this.global.getSelectRound(),

      month:this.formgroup.controls.month.value,
      year:this.formgroup.controls.year.value,
      comp_status:this.sendToxic(),
      comp_anit_thy_name:this.sendThyroidMed(),
      comp_anit_thy_amount:this.formgroup.controls.ThyroidMedVol.value,
      comp_anit_thy_daily:this.formgroup.controls.ThyroidMedRoundPerDay.value,
      comp_beta_name:this.sendBetaBlock(),
      comp_beta_amount:this.formgroup.controls.BetaBlockVol.value,
      comp_beta_daily:this.formgroup.controls.BetaBlockRoundPerDay.value,
      comp_indication:this.sendAllery()

   }
    this.navCtrl.getPrevious().data.formData = body
    let headers = new Headers({ "Content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
      this.http
        .post(
          "https://"+this.global.getIP()+"/healthdata.php?method=update_complication&role="+this.global.getSelectRole(),
          body,
          options
        )
        .map(res => res.json())
        .subscribe(
          data => {
            if(data.result){
              this.presentAlert(data.result);
              this.navCtrl.pop()
            }
          },
          error => {
            console.log(error);
          }
        );

  }
  }
  async presentAlert(txt: string) {
    let alert = await this.alertCtrl.create({
      title: 'การแจ้งเตือน',
      subTitle: txt,
      buttons: ['Ok']
    });
    alert.present();
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
            this.update();
          }
        }
      ]
    });
    alert.present();
  }

}
