import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ProfileService } from '../../core/profile.service';
import { AppUserProfile, AppUserProfileCollection } from '../../models/app-user-profile.model';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  appUserProfile: AppUserProfile = new AppUserProfile();

  constructor(
    private profile: ProfileService
  ) {
    this.loadProfile();
  }

  openCollectionDetail(collectionDetail: AppUserProfileCollection) {
    this.profile.setCurrentCollection(collectionDetail);
  }

  loadProfile() {
    this.profile.getAppUserProfile().then(
      (result) => {
        this.appUserProfile.appUserDetailId = result.appUserDetailId;
        this.appUserProfile.firstName = result.firstName;
        this.appUserProfile.lastName = result.lastName;
        this.appUserProfile.userName = result.userName;
        this.appUserProfile.emailAddress = result.emailAddress;
        this.appUserProfile.mobileNumber = result.mobileNumber;
        this.appUserProfile.profileImageUrl = result.profileImageUrl;

        this.appUserProfile.appUserCollectionDetails = [];
        result.appUserCollectionDetails.forEach(appUserCollectionDetail => {
          var data: AppUserProfileCollection = new AppUserProfileCollection();
          data.collectionDetailId = appUserCollectionDetail.collectionDetailId;
          data.collectionName = appUserCollectionDetail.collectionName;
          data.collectionCoverImageUrl = appUserCollectionDetail.collectionCoverImageUrl;
          data.inventoryCount = appUserCollectionDetail.inventoryCount;
          data.totalAppUserCount = appUserCollectionDetail.totalAppUserCount;
          data.onlineAppUserCount = appUserCollectionDetail.onlineAppUserCount;

          this.appUserProfile.appUserCollectionDetails.push(data);
        });
      });
  }

}
