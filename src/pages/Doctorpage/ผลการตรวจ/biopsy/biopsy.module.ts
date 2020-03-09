import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BiopsyPage } from './biopsy';

@NgModule({
  declarations: [
    BiopsyPage,
  ],
  imports: [
    IonicPageModule.forChild(BiopsyPage),
  ],
})
export class BiopsyPageModule {}
