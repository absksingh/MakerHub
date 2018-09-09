import { Injectable, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';

import Auth0Cordova from '@auth0/cordova';
import * as auth0 from 'auth0-js';
import { CONFIG } from './config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppUser } from '../providers/app-user.model';
import { RegisterUser } from '../providers/register-user.model';
import { Subject } from 'rxjs/Subject';
import { AppUserProfileCollection } from '../models/app-user-profile.model';

const AUTH_CONFIG = {
  // Needed for Auth0 (capitalization: ID):
  clientID: 'cBtTN8f4KrBQ7P48nvRAdTIQ26tfJW8M',
  // Needed for Auth0Cordova (capitalization: Id):
  clientId: 'cBtTN8f4KrBQ7P48nvRAdTIQ26tfJW8M',
  domain: 'absk.auth0.com',
  packageIdentifier: 'com.absk.makerhub'
};

@Injectable()
export class ProfileService {

  //#region Properties

  Auth0 = new auth0.WebAuth(AUTH_CONFIG);
  Client = new Auth0Cordova(AUTH_CONFIG);
  accessToken: string;
  idToken: string;

  user: any;
  loggedIn: boolean;
  loading = true;

  currentCollection$: BehaviorSubject<AppUserProfileCollection> = new BehaviorSubject<AppUserProfileCollection>(new AppUserProfileCollection());

  //#endregion

  //#region Ctor

  constructor(
    private storage: Storage,
    private httpClient: HttpClient,

    public zone: NgZone,
    public events: Events
  ) {
    this.storage.get('profile')
      .then(user => this.user = user);
    this.storage.get('access_token')
      .then(token => this.accessToken = token);
    this.storage.get('id_token')
      .then(token => this.idToken = token);
    this.storage.get('expires_at')
      .then(exp => {
        this.loggedIn = Date.now() < JSON.parse(exp);
        this.loading = false;
      });
  }

  //#endregion

  //#region UserAuthentication

  loginForTest() {
    // Set access token
    this.storage.set('access_token', '_HrY-M9E9t-UDdXwQ9t32M1-Dgi6AdMj');
    this.accessToken = '_HrY-M9E9t-UDdXwQ9t32M1-Dgi6AdMj';
    this.storage.set('id_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5EZzNOekpDUVRZMU1qWkJPVVZGTWtWR016ZEVSVVZGT0RVeVJVWkdNak0xTWpnek1VRTFSQSJ9.eyJuaWNrbmFtZSI6InNpbmdoLm1haGFyem4iLCJuYW1lIjoic2luZ2gubWFoYXJ6bkBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNWIxZjA3ZjRlZWIxMDVkMTY1YTkwYTM4NDE5ODRhZDY_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZzaS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOC0wOS0wOVQxNDo1MjowOS42NTRaIiwiZW1haWwiOiJzaW5naC5tYWhhcnpuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Fic2suYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVhNWY5ZmQzYzZlNzE0MDU1OGE2MTI3NiIsImF1ZCI6ImNCdFROOGY0S3JCUTdQNDhudlJBZFRJUTI2dGZKVzhNIiwiaWF0IjoxNTM2NTA0NzMxLCJleHAiOjE1MzY1NDA3MzF9.YWOOQrpNlExhjSCLU6B1y2M8O3RoyS20O7hf90CbjN0wThDbrnBAl0INkCHVxD0jCC7pEIWBwPjY4cKSZFKAnVYt96cZ2MnM4nmk2ZkBdP9MqFzFhjR0sjTVzReE-47gJvQZlJfBtoCKwsrRrgCsM6ZNsqRVRSg_fU08PDqtO-aboru-obbZqwVGvhHK_hpPq4hU237Ie19MKWzjAJ_3nTPmLMlThwK9EJLETcdaC6DxVAf1AeoRYy8hRCg5o0gHR4gzbtw0aU5mgzx7L5I9kPv7IdTXytfcA7N7oVH0h8N5zib7Dx3672vQpgcqxVstHNFuyyJ2FbvuGsDx-SrWRg');
    this.idToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5EZzNOekpDUVRZMU1qWkJPVVZGTWtWR016ZEVSVVZGT0RVeVJVWkdNak0xTWpnek1VRTFSQSJ9.eyJuaWNrbmFtZSI6InNpbmdoLm1haGFyem4iLCJuYW1lIjoic2luZ2gubWFoYXJ6bkBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNWIxZjA3ZjRlZWIxMDVkMTY1YTkwYTM4NDE5ODRhZDY_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZzaS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOC0wOS0wOVQxNDo1MjowOS42NTRaIiwiZW1haWwiOiJzaW5naC5tYWhhcnpuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Fic2suYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVhNWY5ZmQzYzZlNzE0MDU1OGE2MTI3NiIsImF1ZCI6ImNCdFROOGY0S3JCUTdQNDhudlJBZFRJUTI2dGZKVzhNIiwiaWF0IjoxNTM2NTA0NzMxLCJleHAiOjE1MzY1NDA3MzF9.YWOOQrpNlExhjSCLU6B1y2M8O3RoyS20O7hf90CbjN0wThDbrnBAl0INkCHVxD0jCC7pEIWBwPjY4cKSZFKAnVYt96cZ2MnM4nmk2ZkBdP9MqFzFhjR0sjTVzReE-47gJvQZlJfBtoCKwsrRrgCsM6ZNsqRVRSg_fU08PDqtO-aboru-obbZqwVGvhHK_hpPq4hU237Ie19MKWzjAJ_3nTPmLMlThwK9EJLETcdaC6DxVAf1AeoRYy8hRCg5o0gHR4gzbtw0aU5mgzx7L5I9kPv7IdTXytfcA7N7oVH0h8N5zib7Dx3672vQpgcqxVstHNFuyyJ2FbvuGsDx-SrWRg';

    // Set access token expiration
    const expiresAt = JSON.stringify((86400 * 1000) + new Date().getTime());
    this.storage.set('expires_at', expiresAt);
    this.loggedIn = true;
    this.storage.set('profile', {
      "sub": "auth0|5a5f9fd3c6e7140558a61276",
      "given_name": "Abhishek",
      "family_name": "Singh",
      "nickname": "singh.maharzn",
      "name": "Abhishek Singh",
      "picture": "https://lh6.googleusercontent.com/-uBggK2wAn3s/AAAAAAAAAAI/AAAAAAAAJDI/7I8-7NyBfsQ/photo.jpg",
      "gender": "male",
      "locale": "en",
      "updated_at": "2018-06-05T19:32:04.949Z",
      "email": "singh.maharzn@gmail.com",
      "email_verified": true
    }).then(() => {
      this.getCurrentUser();
    });

  }

  login() {
    this.loading = true;
    const options = {
      scope: 'openid profile offline_access email'
    };
    // Authorize login request with Auth0: open login page and get auth results
    this.Client.authorize(options, (err, authResult) => {
      if (err) {
        throw err;
      }
      // Set access token
      this.storage.set('access_token', authResult.accessToken);
      this.accessToken = authResult.accessToken;
      this.storage.set('id_token', authResult.idToken);
      this.idToken = authResult.idToken;

      // Set access token expiration
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      this.storage.set('expires_at', expiresAt);
      // Set logged in
      this.loggedIn = true;
      // Fetch user's profile info
      this.Auth0.client.userInfo(this.accessToken, (err, profile) => {
        if (err) {
          throw err;
        }
        this.storage.set('profile', profile).then(val => {
          this.zone.run(() => {
            this.user = profile;

            console.log("profile", profile.sub);

            this.getCurrentUser();

          });

        });
      });

    });
  }

  logout() {
    this.storage.remove('profile');
    this.storage.remove('access_token');
    this.storage.remove('id_token');
    this.storage.remove('expires_at');
    this.accessToken = null;
    this.user = null;
    this.loggedIn = false;

    this.events.publish("USER_LOGGEDIN", false);
  }

  //#endregion

  //#region Utilities

  setAppUser(appUser: any) {
    this.storage.set('appUser', appUser);
  }

  getAppUser() {
    return this.storage.get('appUser');
  }

  getAppUserProfile() {
    return this.storage.get('appUser');
  }

  //#endregion

  //#region UserProfile

  getCurrentUser() {
    return this.httpClient.get<any>([
      CONFIG.apiUrl,
      "User"
    ].join("/"))
      .subscribe(result => {
        if (result) {
          console.log("result", result);
          this.setAppUser(result);
          this.setCurrentCollection(result.appUserCollectionDetails[0])
          this.events.publish("USER_REGISTERED", true);
        }
        else {
          console.log("Not registered");
          this.events.publish("USER_REGISTERED", false);
        }
      });
  }

  setCurrentCollection(nextCurrentCollection: AppUserProfileCollection) {
    console.log("nextCurrentCollection", nextCurrentCollection);
    this.currentCollection$.next(nextCurrentCollection);
  }

  registerUser(data: RegisterUser) {
    return this.httpClient
      .post<AppUser>([
        CONFIG.apiUrl,
        "User",
      ].join("/"), data, {
          headers: new HttpHeaders({
            "Content-Type": "application/json"
          })
        });
  }

  //#endregion
}
