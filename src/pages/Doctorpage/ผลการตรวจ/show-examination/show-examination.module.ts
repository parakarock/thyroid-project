import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowExaminationPage } from './show-examination';

@NgModule({
  declarations: [
    ShowExaminationPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowExaminationPage),
  ],
})
export class ShowExaminationPageModule {}
