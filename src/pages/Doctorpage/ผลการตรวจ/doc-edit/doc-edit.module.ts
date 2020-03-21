import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocEditPage } from './doc-edit';

@NgModule({
  declarations: [
    DocEditPage,
  ],
  imports: [
    IonicPageModule.forChild(DocEditPage),
  ],
})
export class DocEditPageModule {}
