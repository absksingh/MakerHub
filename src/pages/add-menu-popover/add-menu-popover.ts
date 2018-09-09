import { Component } from '@angular/core';

import { App, NavController, ModalController, ViewController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-menu-popover',
  templateUrl: 'add-menu-popover.html'
})
export class AddMenuPopoverPage {

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController
  ) { }

  openAddDealPage() {
    this.navCtrl.push("AddDealPage");
  }

  openAddContactPage() {
    this.navCtrl.push("AddContactPage");
  }

  openAddInventoryPage() {
    this.navCtrl.push("AddInventoryPage");
  }
}