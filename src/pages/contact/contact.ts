import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Contact } from '../../providers/contact/contact.model';
import { ContactService } from '../../providers/contact/contact.service';
import { ProfileService } from '../../core/profile.service';
import { Subject } from 'rxjs/Subject';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contacts$: Subject<Contact[]> = new Subject<Contact[]>();

  constructor(
    public navCtrl: NavController,

    private contactService: ContactService,
    private profile: ProfileService
  ) {
    this.profile.currentCollection$.subscribe((data) => {
      this.loadContacts(data.collectionDetailId);
    });
  }

  loadContacts(collectionDetailId: string) {
    console.log("loadContacts", collectionDetailId);
    this.contactService.getAll().subscribe(this.contacts$);
  }

  openAddContactPage() {
    this.navCtrl.push("AddContactPage");
  }

}
