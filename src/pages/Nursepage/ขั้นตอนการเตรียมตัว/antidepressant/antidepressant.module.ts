import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AntidepressantPage } from './antidepressant';

@NgModule({
  declarations: [
    AntidepressantPage,
  ],
  imports: [
    IonicPageModule.forChild(AntidepressantPage),
  ],
})
export class AntidepressantPageModule {}
