import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocLabPage } from './doc-lab';

@NgModule({
  declarations: [
    DocLabPage,
  ],
  imports: [
    IonicPageModule.forChild(DocLabPage),
  ],
})
export class DocLabPageModule {}
