import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DealPage } from './deal';
import { DealServiceModule } from '../../providers/deal/deal-service.module';
import { ComponentsModule } from '../../components/components.module';
import { ItemServiceModule } from '../../providers/item/item-service.module';

@NgModule({
    declarations: [
        DealPage
    ],
    imports: [
        IonicPageModule.forChild(DealPage),
        DealServiceModule,
        ItemServiceModule,
        ComponentsModule
    ],
    exports: [
        DealPage,
        ComponentsModule
    ]
})
export class DealPageModule { }