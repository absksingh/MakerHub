import { Component, Input } from '@angular/core';
import { Item, ImageDetail } from '../../providers/item/item.model';

@Component({
  selector: 'item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailComponent {

  private _item: Item;

  rows: Array<Array<ImageDetail>>;
  isSingle: boolean = false;

  @Input()
  set item(data: Item) {
    this._item = data;
    this.loadImages();
  }

  get item(): Item { return this._item; }

  constructor() {

  }

  loadImages() {
    console.log("data", this.item);
    this.rows = Array(Math.ceil(this.item.itemImages.length / 2));
    this.isSingle = this.item.itemImages.length < 2;
    let rowNum = 0; //counter to iterate over the rows in the grid

    for (let i = 0; i < this.item.itemImages.length; i += 2) {

      this.rows[rowNum] = Array(); //declare two elements per row

      if (this.item.itemImages[i]) {
        this.rows[rowNum][0] = this.item.itemImages[i]
      }

      if (this.item.itemImages[i + 1]) { //repeat for the second image
        this.rows[rowNum][1] = this.item.itemImages[i + 1]
      }

      rowNum++; //go on to the next row

    }

  }
}
