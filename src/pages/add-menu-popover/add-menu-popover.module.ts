import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMenuPopoverPage } from './add-menu-popover';

@NgModule({
    declarations: [
        AddMenuPopoverPage
    ],
    imports: [
        IonicPageModule.forChild(AddMenuPopoverPage)
    ],
    exports: [
        AddMenuPopoverPage
    ]
})
export class AppMenuPopoverPageModule { }