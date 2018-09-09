import { Component, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../core/profile.service';
import { RegisterUser } from '../../providers/register-user.model';
import { SingleImageUploadComponent } from '../../components/single-image-upload/single-image-upload';
import { ImageDetail } from '../../providers/item/item.model';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('profileImageUploadComponent')
  private profileImageUploadComponent: SingleImageUploadComponent;
  @ViewChild('collectionCoverImageUploadComponent')
  private collectionCoverImageUploadComponent: SingleImageUploadComponent;

  registrationForm: FormGroup;
  newRegistration: RegisterUser = new RegisterUser();

  profileImageDetail: ImageDetail;
  coverImageDetail: ImageDetail;

  constructor(
    private formBuilder: FormBuilder,
    public profile: ProfileService
  ) {
    console.log("this.auth.user.sub.email",this.profile.user.sub.email);
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      appUserEmailAddress: [this.profile.user.email, Validators.required],
      appUserMobile: ['', Validators.required],
      collectionName: ['', Validators.required]
    });

    this.profileImageDetail = new ImageDetail();
    this.coverImageDetail = new ImageDetail();
    console.log("registration value", this.registrationForm.value);
  }

  register() {
    this.newRegistration = this.registrationForm.value;
    this.newRegistration.externalId = this.profile.user.sub;
    this.newRegistration.appUserName = this.registrationForm.value.appUserMobile;
    this.newRegistration.appUserEmailAddress = this.profile.user.email;

    this.newRegistration.userProfileImage = this.profileImageUploadComponent.imageDetail;
    this.newRegistration.collectionCoverImage = this.collectionCoverImageUploadComponent.imageDetail;

    this.profile.registerUser(this.newRegistration).subscribe(
      result => {
        this.profile.getCurrentUser();
      },
      err => {
      }
    );
  }

}
