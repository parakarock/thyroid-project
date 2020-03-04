import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InitiallyPage } from './initially';

@NgModule({
  declarations: [
    InitiallyPage,
  ],
  imports: [
    IonicPageModule.forChild(InitiallyPage),
  ],
})
export class InitiallyPageModule {}
