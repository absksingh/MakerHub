import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryPage } from './inventory';
import { ComponentsModule } from '../../components/components.module';
import { ItemServiceModule } from '../../providers/item/item-service.module';

@NgModule({
  declarations: [
    InventoryPage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryPage),
    ComponentsModule,
    ItemServiceModule
  ],
  exports: [
    ComponentsModule
  ]
})
export class InventoryPageModule { }
