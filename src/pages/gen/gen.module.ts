import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenPage } from './gen';

@NgModule({
  declarations: [
    GenPage,
  ],
  imports: [
    IonicPageModule.forChild(GenPage),
  ],
})
export class GenPageModule {}
