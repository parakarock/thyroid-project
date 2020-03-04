import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabooPage } from './taboo';

@NgModule({
  declarations: [
    TabooPage,
  ],
  imports: [
    IonicPageModule.forChild(TabooPage),
  ],
})
export class TabooPageModule {}
