import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NofoodPage } from './nofood';

@NgModule({
  declarations: [
    NofoodPage,
  ],
  imports: [
    IonicPageModule.forChild(NofoodPage),
  ],
})
export class NofoodPageModule {}
