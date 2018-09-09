import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Deal, DealItem } from '../../../providers/deal/deal.model';
import { EmitterService } from '../../../core/emitter.service';
import { Item } from '../../../providers/item/item.model';
import { DealService } from '../../../providers/deal/deal.service';

@IonicPage()
@Component({
  selector: 'page-deal-detail',
  templateUrl: 'deal-detail.html',
})
export class DealDetailPage {

  deal: Deal;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,

    private dealService: DealService
  ) {
    this.deal = this.navParams.data;

    console.log("dealdetailpage this.deal", this.deal);

    EmitterService
      .get("DEAL_ITEM_ADD_" + this.deal.dealDetailId)
      .subscribe(
        (deals: DealItem[]) => {
          this.loadDealItems(this.deal.dealDetailId);
        });
  }

  openAddDealItemModal() {
    console.log("openAddDealItemModal this.deal", this.deal);
    let modal = this.modalCtrl.create("DealItemPage", this.deal);
    modal.present();
  }

  loadDealItems(id: number) {
    this.dealService.getDealIem(id).subscribe(
      result => {
        if (result)
          this.deal = result;
      },
      err => {

      });
  }

  itemClicked(data: Item) {

  }
}
