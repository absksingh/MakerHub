import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealDetailPage } from './deal-detail';
import { DealPageModule } from '../deal.module';

@NgModule({
  declarations: [
    DealDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DealDetailPage),
    DealPageModule
  ],
})
export class DealDetailPageModule { }
