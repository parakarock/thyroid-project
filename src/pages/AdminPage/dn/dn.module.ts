import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DnPage } from './dn';

@NgModule({
  declarations: [
    DnPage,
  ],
  imports: [
    IonicPageModule.forChild(DnPage),
  ],
})
export class DnPageModule {}
