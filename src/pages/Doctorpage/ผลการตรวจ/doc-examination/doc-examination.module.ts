import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocExaminationPage } from './doc-examination';

@NgModule({
  declarations: [
    DocExaminationPage,
  ],
  imports: [
    IonicPageModule.forChild(DocExaminationPage),
  ],
})
export class DocExaminationPageModule {}
