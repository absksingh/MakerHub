import { Component, Input } from '@angular/core';
import { DealItem } from '../../providers/deal/deal.model';
import { ImageDetail } from '../../providers/item/item.model';

@Component({
  selector: 'deal-item-detail',
  templateUrl: 'deal-item-detail.html'
})
export class DealItemDetailComponent {

  private _dealItem: DealItem;
  rows: Array<Array<ImageDetail>>;
  isSingle: boolean = false;

  fullName: string;

  @Input()
  set dealItem(data: DealItem) {
    this.fullName = data.sender.firstName + " " + data.sender.lastName;
    this._dealItem = data;
    this.loadImages();
  }

  get dealItem(): DealItem { return this._dealItem; }

  constructor() {

  }

  loadImages() {
    this.rows = Array(Math.ceil(this.dealItem.itemDetail.itemImages.length / 2));
    this.isSingle = this.dealItem.itemDetail.itemImages.length < 2;
    let rowNum = 0; //counter to iterate over the rows in the grid

    for (let i = 0; i < this.dealItem.itemDetail.itemImages.length; i += 2) {

      this.rows[rowNum] = Array(); //declare two elements per row

      if (this.dealItem.itemDetail.itemImages[i]) {
        this.rows[rowNum][0] = this.dealItem.itemDetail.itemImages[i]
      }

      if (this.dealItem.itemDetail.itemImages[i + 1]) { //repeat for the second image
        this.rows[rowNum][1] = this.dealItem.itemDetail.itemImages[i + 1]
      }

      rowNum++; //go on to the next row

    }
  }
}
