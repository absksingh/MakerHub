import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactService } from '../../../providers/contact/contact.service';
import { Contact } from '../../../providers/contact/contact.model';
import { DealService } from '../../../providers/deal/deal.service';
import { Deal } from '../../../providers/deal/deal.model';
import { EmitterService } from '../../../core/emitter.service';
import { Collection } from '../../../providers/collection/collection.model';

@IonicPage()
@Component({
  selector: 'page-add-deal',
  templateUrl: 'add-deal.html',
})
export class AddDealPage {

  searchQuery: string = '';
  contacts: Contact[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

    private contactService: ContactService,
    private dealService: DealService
  ) {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getAll().subscribe(
      result => {
        this.contacts = result
      });
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

  addDeal(contact: Contact) {

    console.log("Add Deal Contact", contact);
    var newDeal = new Deal();
    newDeal.createdByCollectionDetailId = contact.collectionDetailId;

    var newCollectionDetail = new Collection();
    newCollectionDetail.collectionDetailId = contact.referenceCollectionDetailId;
    newCollectionDetail.collectionDetailName = contact.referenceCollectionDetailName;

    newDeal.referencedCollectionDetail = newCollectionDetail;
    newDeal.aliasName = contact.referenceCollectionDetailName;
    console.log("Add Deal newDeal", newDeal);

    this.dealService.add(newDeal).subscribe(
      result => {
        EmitterService.get("DEAL_ADD").emit(newDeal);
      },
      err => {
        // Log errors if any
        console.log(err);
      });

    this.navCtrl.pop();
  }

}
