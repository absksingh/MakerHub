import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDealPage } from './add-deal';
import { ContactPageModule } from '../../contact/contact.module';
import { DealPageModule } from '../deal.module';

@NgModule({
  declarations: [
    AddDealPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDealPage),
    ContactPageModule,
    DealPageModule
  ],
})
export class AddDealPageModule { }
