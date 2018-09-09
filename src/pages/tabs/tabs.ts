import { Component } from '@angular/core';

import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabDeals = "DealPage";
  tabContacts = "ContactPage";
  tabInventory = "InventoryPage";
  tabProfile = "ProfilePage";

  constructor(
  ) {

  }

}
