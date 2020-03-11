import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocBiopsyPage } from './doc-biopsy';

@NgModule({
  declarations: [
    DocBiopsyPage,
  ],
  imports: [
    IonicPageModule.forChild(DocBiopsyPage),
  ],
})
export class DocBiopsyPageModule {}
