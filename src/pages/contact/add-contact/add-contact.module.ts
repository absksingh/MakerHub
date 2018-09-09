import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddContactPage } from './add-contact';
import { ContactPageModule } from '../contact.module';

@NgModule({
  declarations: [
    AddContactPage,
  ],
  imports: [
    IonicPageModule.forChild(AddContactPage),
    ContactPageModule
  ],
})
export class AddContactPageModule { }
