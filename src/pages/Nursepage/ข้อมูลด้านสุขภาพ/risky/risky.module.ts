import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RiskyPage } from './risky';

@NgModule({
  declarations: [
    RiskyPage,
  ],
  imports: [
    IonicPageModule.forChild(RiskyPage),
  ],
})
export class RiskyPageModule {}
