import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddInventoryPage } from './add-inventory';
import { InventoryPageModule } from '../inventory.module';

@NgModule({
  declarations: [
    AddInventoryPage,
  ],
  imports: [
    IonicPageModule.forChild(AddInventoryPage),
    InventoryPageModule
  ]
})
export class AddInventoryPageModule { }
