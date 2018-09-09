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
  selector: 'image-upload',
  templateUrl: 'image-upload.html'
})
export class ImageUploadComponent {
  loading: Loading;
  rows: Array<Array<ImageDetail>>;

  private _imageDetails: ImageDetail[];
  @Input()
  set imageDetails(data: ImageDetail[]) {
    this._imageDetails = data;
    this.loadImages();
  }

  get imageDetails(): ImageDetail[] { return this._imageDetails; }

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,

    private camera: Camera,
    private transfer: FileTransfer
  ) {

  }

  ngOnChanges() {
    this.loadImages();
  }

  public loadImages() {
    this.rows = Array(Math.ceil(this.imageDetails.length / 2));

    let rowNum = 0;

    for (let i = 0; i < this.imageDetails.length; i += 2) {

      this.rows[rowNum] = Array();

      if (this.imageDetails[i]) {
        this.rows[rowNum][0] = this.imageDetails[i];
      }

      if (this.imageDetails[i + 1]) {
        this.rows[rowNum][1] = this.imageDetails[i + 1];
      }

      rowNum++;
    }
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
      this.imageDetails.push(JSON.parse(data.response));
      this.loading.dismissAll();
      this.presentToast('Image succesfully uploaded.');
      this.loadImages();
    }, err => {
      console.log("err", err);
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }

}
