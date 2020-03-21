import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RadiographicsPage } from './radiographics';

@NgModule({
  declarations: [
    RadiographicsPage,
  ],
  imports: [
    IonicPageModule.forChild(RadiographicsPage),
  ],
})
export class RadiographicsPageModule {}
