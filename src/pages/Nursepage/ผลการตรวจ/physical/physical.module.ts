import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhysicalPage } from './physical';

@NgModule({
  declarations: [
    PhysicalPage,
  ],
  imports: [
    IonicPageModule.forChild(PhysicalPage),
  ],
})
export class PhysicalPageModule {}
