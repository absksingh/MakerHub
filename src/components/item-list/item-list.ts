import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../providers/item/item.model';

@Component({
  selector: 'item-list',
  templateUrl: 'item-list.html'
})
export class ItemListComponent {

  private _items: Item[];

  rows: Array<Array<Item>>;

  @Input()
  set items(data: Item[]) {
    this._items = data;
    this.loadItems();
  }

  get items(): Item[] { return this._items; }

  @Output() onItemClicked: EventEmitter<any> = new EventEmitter()

  constructor() {

  }

  itemClicked(data: Item): void {
    this.onItemClicked.emit(data);
  }

  loadItems() {
    this.rows = Array(Math.ceil(this.items.length / 2));

    let rowNum = 0; //counter to iterate over the rows in the grid

    for (let i = 0; i < this.items.length; i += 2) {

      this.rows[rowNum] = Array(); //declare two elements per row

      if (this.items[i]) {
        this.rows[rowNum][0] = this.items[i]
      }

      if (this.items[i + 1]) { //repeat for the second image
        this.rows[rowNum][1] = this.items[i + 1]
      }

      rowNum++; //go on to the next row
    }
  }

}
