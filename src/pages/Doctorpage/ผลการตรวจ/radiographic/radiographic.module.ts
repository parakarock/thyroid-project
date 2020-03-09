import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RadiographicPage } from './radiographic';

@NgModule({
  declarations: [
    RadiographicPage,
  ],
  imports: [
    IonicPageModule.forChild(RadiographicPage),
  ],
})
export class RadiographicPageModule {}
