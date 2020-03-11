import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EatfoodPage } from './eatfood';

@NgModule({
  declarations: [
    EatfoodPage,
  ],
  imports: [
    IonicPageModule.forChild(EatfoodPage),
  ],
})
export class EatfoodPageModule {}
