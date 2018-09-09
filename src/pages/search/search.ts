import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
