import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatauserPage } from './datauser';

@NgModule({
  declarations: [
    DatauserPage,
  ],
  imports: [
    IonicPageModule.forChild(DatauserPage),
  ],
})
export class DatauserPageModule {}
