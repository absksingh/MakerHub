import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealItemPage } from './deal-item';
import { DealPageModule } from '../deal.module';

@NgModule({
  declarations: [
    DealItemPage,
  ],
  imports: [
    IonicPageModule.forChild(DealItemPage),
    DealPageModule
  ],
})
export class DealItemPageModule { }
