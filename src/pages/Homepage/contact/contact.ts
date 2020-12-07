import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    console.log("ionViewDidLoad ContactPage");
  }

  myObj = [{ 	name: "พญ.อลิสรา วงศ์สุทธิเลิศ",
  major: "แพทย์เวชศาสตร์นิวเคลียร์" ,
  branch: "สาขาวิชารังสีวิทยาและเวชศาสตร์นิวเคลียร์",
  hospital: "คณะแพทยศาสตร์ มหาวิทยาลัยบูรพา",
  img:"Doc1.png"
      },
      { name: "นพ.สฐาปกร ศิริวงศ์",
  major: "อายุรแพทย์ต่อมไร้ท่อและเมตาบอลิซึม" ,
  branch: "ฝ่ายอายุรกรรม",
  hospital: "โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา",
  img:"Doc2.png"
      },

      { 	name: "พญ.รุจิเรข ธรรมเจริญ",
  major: "แพทย์เวชศาสตร์นิวเคลียร์" ,
  branch: "สาขาวิชารังสีวิทยาและเวชศาสตร์นิวเคลียร์",
  hospital: "คณะแพทยศาสตร์ มหาวิทยาลัยบูรพา",
  img:"Doc3.png"
      },

      { 	name: "พญ.เพ็ชรงาม ไชยวานิช",
  major: "อายุรแพทย์ต่อมไร้ท่อและเมตาบอลิซึม" ,
  branch: "สาขาวิชาอายุรศาสตร์",
  hospital: "คณะแพทยศาสตร์ มหาวิทยาลัยบูรพา",
  img:"Doc4.jpg"
      },

      { 	name: "พญ.ปรีญาภรณ์ วิถีสำราญธรรม",
  major: "อายุรแพทย์ต่อมไร้ท่อและเมตาบอลิซึม" ,
  branch: "แผนกเบาหวานและต่อมไร้ท่อ",
  hospital: "โรงพยาบาลกรุงเทพพัทยา",
  img:"Doc5.png"
      },

        { 	name: "นพ.จักรพงษ์ จิรประภาพร",
  major: "แพทย์โสต ศอ นาสิก" ,
  branch: "แผนกโสต ศอ นาสิก",
  hospital: "โรงพยาบาลพญาไท ศรีราชา",
  img:"Doc6.png"
      },

        { 	name: "ดร.ปาจรีย์ อับดุลลากาซิม",
  major: "อาจารย์ด้านโภชนาการ" ,
  branch: "ภาควิชาสาธารณสุขพื้นฐาน",
  hospital: "คณะสาธารณสุขศาสตร์ มหาวิทยาลัยบูรพา",
  img:"Doc7.png"
      },

        { 	name: "นายไพศาล หรุ่นโพธิ์",
  major: "นักรังสีการแพทย์" ,
  branch: "งานรังสีวิทยาและเวชศาสตร์นิวเคลียร์",
  hospital: "โรงพยาบาลมหาวิทยาลัยบูรพา",
  img:"Doc8.png"
      },
      ];
}
