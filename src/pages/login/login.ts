import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ProfileService } from '../../core/profile.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public profile: ProfileService
  ) {

  }

  ionViewWillEnter() {
    if (this.profile.loggedIn) {
      this.navCtrl.setRoot('TabsPage');
    }
  }

  login() {
    this.profile.loginForTest();
    // this.profile.login();
  }

}
