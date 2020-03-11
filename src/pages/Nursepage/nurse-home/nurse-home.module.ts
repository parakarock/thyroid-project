import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NurseHomePage } from './nurse-home';

@NgModule({
  declarations: [
    NurseHomePage,
  ],
  imports: [
    IonicPageModule.forChild(NurseHomePage),
  ],
})
export class NurseHomePageModule {}
