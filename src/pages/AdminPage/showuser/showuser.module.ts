import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowuserPage } from './showuser';

@NgModule({
  declarations: [
    ShowuserPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowuserPage),
  ],
})
export class ShowuserPageModule {}
