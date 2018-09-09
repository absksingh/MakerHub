import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ImageUploadComponent } from '../../../../components/image-upload/image-upload';
import { Item } from '../../../../providers/item/item.model';
import { DealService } from '../../../../providers/deal/deal.service';
import { Deal, DealItem } from '../../../../providers/deal/deal.model';
import { EmitterService } from '../../../../core/emitter.service';

@IonicPage()
@Component({
  selector: 'page-deal-item-action',
  templateUrl: 'deal-item-action.html',
})
export class DealItemActionPage {

  @ViewChild(ImageUploadComponent)
  private imageUploadComponent: ImageUploadComponent;

  itemTransferQuantity: number;
  item: Item;
  deal: Deal;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,

    private navParams: NavParams,
    private dealService: DealService
  ) {
    this.item = this.navParams.get("item");
    this.deal = this.navParams.get("deal");
  }

  ngAfterViewInit() {
    console.log("this.item deal item action", this.item)
    this.imageUploadComponent.imageDetails = this.item.itemImages;
  }

  sendDealItem() {
    this.navCtrl.getPrevious(this.viewCtrl).dismiss();
    this.navCtrl.popTo("DealDetailPage");

    var newDealItem: DealItem = new DealItem();
    newDealItem.dealDetailId = this.deal.dealDetailId;
    newDealItem.itemDetail = this.item;
    newDealItem.transferQuantity = this.itemTransferQuantity;
    newDealItem.currentReferenceCollectionDetailId = this.item.currrentReferenceCollectionDetail.collectionDetailId;
    newDealItem.newReferenceCollectionDetailId = this.deal.referencedCollectionDetail.collectionDetailId;


    console.log("addDealItem", newDealItem);

    this.dealService.addDealItem(newDealItem).subscribe(
      result => {
        EmitterService.get("DEAL_ITEM_ADD_" + newDealItem.dealDetailId).emit(newDealItem);
      },
      err => {
        // Log errors if any
        console.log(err);
      });;
  }

}