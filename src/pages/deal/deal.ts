import { Component } from '@angular/core';
import { IonicPage, PopoverController, NavController } from 'ionic-angular';
import { Deal } from '../../providers/deal/deal.model';
import { DealService } from '../../providers/deal/deal.service';
import { ProfileService } from '../../core/profile.service';
import { Subject } from 'rxjs/Subject';

@IonicPage()
@Component({
  selector: 'page-deal',
  templateUrl: 'deal.html'
})
export class DealPage {

  deals$: Subject<Deal[]> = new Subject<Deal[]>();
  error: Error[];

  constructor(
    public navCtrl: NavController,

    private popOverCtrl: PopoverController,

    private dealService: DealService,
    private profile: ProfileService
  ) {
    // this.loadDeals();

    // EmitterService
    //   .get("DEAL_ADD")
    //   .subscribe(
    //     (deals: Deal[]) => {
    //       this.loadDeals();
    //     });

    this.profile.currentCollection$.subscribe((data) => {
      this.loadDeals(data.collectionDetailId);
    });
  }

  loadDeals(collectionDetailId: string) {
    this.dealService.getAllByCollectionDetailId(collectionDetailId).subscribe(this.deals$);
  }

  openDealDetailPage(deal: Deal) {

    console.log("openDealDetailPage", deal);
    this.navCtrl.push("DealDetailPage", deal);
  }

  public presentPopover(ev) {

    let popover = this.popOverCtrl.create("AddMenuPopoverPage");

    popover.present({
      ev: ev
    });
  }

}
