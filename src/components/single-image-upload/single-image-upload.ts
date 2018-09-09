import { Component, Input } from '@angular/core';
import {
  ActionSheetController,
  Platform,
  ToastController,
  LoadingController,
  Loading
} from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { ImageDetail } from '../../providers/item/item.model';
import { CONFIG } from '../../core/config';

@Component({
  selector: 'single-image-upload',
  templateUrl: 'single-image-upload.html'
})
export class SingleImageUploadComponent {
  loading: Loading;

  private _imageDetail: ImageDetail;
  @Input()
  set imageDetail(data: ImageDetail) {
    console.log("simsetter", data);
    if (data)
      this._imageDetail = data;
    this._imageDetail = new ImageDetail();
  }

  get imageDetail(): ImageDetail { return this._imageDetail; }

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,

    private camera: Camera,
    private transfer: FileTransfer
  ) {
    console.log("simuctor", this.imageDetail);
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      this.uploadImage(imagePath);
    }, (err) => {
      console.log("err: getPicture", err);
      this.presentToast('Error while selecting image.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  public uploadImage(path: any) {
    // Destination URL
    var url = [CONFIG.apiUrl, "image"].join("/");

    // File for Upload
    var targetPath = path;

    var options: FileUploadOptions = {
      fileKey: "file",
      httpMethod: "POST"
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      console.log("JSON.parse(data.response)",JSON.parse(data.response));
      var responseData=JSON.parse(data.response);
      this.imageDetail.imageId=responseData.imageId;
      this.imageDetail.mimeType=responseData.mimeType;
      this.imageDetail.caption=responseData.caption;
      this.imageDetail.imageUrl=responseData.imageUrl;

      this.loading.dismissAll();
      this.presentToast('Image succesfully uploaded.');
    }, err => {
      console.log("err", err);
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }

}
