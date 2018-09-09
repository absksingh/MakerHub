import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import Auth0Cordova
import Auth0Cordova from '@auth0/cordova';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = "LoginPage";

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,

    public events: Events
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // Add this function
    (<any>window).handleOpenURL = (url) => {
      Auth0Cordova.onRedirectUri(url);
    };

    events.subscribe("USER_REGISTERED", (registered) => {
      if (registered) {
        this.rootPage = "TabsPage";
      }
      else {
        console.log("Not registered appComponent");

        this.rootPage = "RegisterPage";
      }
    });
  }
}
