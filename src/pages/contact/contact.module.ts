import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ContactPage } from './contact';
import { ComponentsModule } from '../../components/components.module';
import { ContactServiceModule } from '../../providers/contact/contact-service.module';

@NgModule({
    declarations: [
        ContactPage
    ],
    imports: [
        IonicPageModule.forChild(ContactPage),
        ComponentsModule,
        ContactServiceModule
    ],
    exports: [
        ContactPage
    ]
})
export class ContactPageModule { }