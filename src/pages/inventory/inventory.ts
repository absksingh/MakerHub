import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ItemService } from '../../providers/item/item.service';
import { Item } from '../../providers/item/item.model';
import { EmitterService } from '../../core/emitter.service';

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  items: Item[] = new Array<Item>();
  rows: Array<Array<Item>>;

  constructor(
    private navCtrl: NavController,
    private itemService: ItemService
  ) {
    this.loadItems();

    EmitterService
      .get("ITEM_ADD")
      .subscribe(
        (deals: Item[]) => {
          this.loadItems();
        });
  }

  openAddInventoryPage() {
    this.navCtrl.push("AddInventoryPage");
  }

  loadItems() {
    this.itemService.getAll().subscribe(
      result => {
        if (result)
          this.items = result;
      },
      err => {

      });
  }

}
