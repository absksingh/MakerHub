import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealPageModule } from '../../deal.module';
import { DealItemActionPage } from './deal-item-action';

@NgModule({
  declarations: [
    DealItemActionPage,
  ],
  imports: [
    IonicPageModule.forChild(DealItemActionPage),
    DealPageModule
  ],
})
export class DealItemPageModule { }
