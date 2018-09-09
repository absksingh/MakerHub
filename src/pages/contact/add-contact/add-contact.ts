import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contact } from '../../../providers/contact/contact.model';
import { ContactService } from '../../../providers/contact/contact.service';

@IonicPage()
@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html',
})
export class AddContactPage {

  searchQuery: string = '';
  contacts: Contact[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

    private contactService: ContactService,
  ) {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getAll().subscribe(
      result => {
        this.contacts = result
      },
      err => {

      }
    );
  }

  getItems(ev: any) {

    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.contacts = this.contacts.filter((contact) => {
        return (contact.referenceCollectionDetailName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.loadContacts();
    }

  }

}
