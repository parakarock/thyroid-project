import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistersPage } from './registers';

@NgModule({
  declarations: [
    RegistersPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistersPage),
  ],
})
export class RegistersPageModule {}
