import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgreePage } from './agree';

@NgModule({
  declarations: [
    AgreePage,
  ],
  imports: [
    IonicPageModule.forChild(AgreePage),
  ],
})
export class AgreePageModule {}
