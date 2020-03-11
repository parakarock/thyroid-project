import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhysicalsPage } from './physicals';

@NgModule({
  declarations: [
    PhysicalsPage,
  ],
  imports: [
    IonicPageModule.forChild(PhysicalsPage),
  ],
})
export class PhysicalsPageModule {}
