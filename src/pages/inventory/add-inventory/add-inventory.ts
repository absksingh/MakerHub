import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  NavController
} from 'ionic-angular';
import { Item, ImageDetail } from '../../../providers/item/item.model';
import { ItemService } from '../../../providers/item/item.service';
import { EmitterService } from '../../../core/emitter.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageUploadComponent } from '../../../components/image-upload/image-upload';

@IonicPage()
@Component({
  selector: 'page-add-inventory',
  templateUrl: 'add-inventory.html',
})
export class AddInventoryPage {

  @ViewChild(ImageUploadComponent)
  private imageUploadComponent: ImageUploadComponent;

  itemForm: FormGroup;
  newItem: Item = new Item();

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private itemService: ItemService
  ) {
    this.itemForm = this.formBuilder.group({
      itemName: ["", Validators.required],
      height: [],
      weight: [],
      itemQuantity: ["", Validators.required],
      tags: []
    });
  }

  ngAfterViewInit() {
    this.imageUploadComponent.imageDetails = new Array<ImageDetail>();
  }

  public addItem() {
    this.newItem = this.itemForm.value;
    this.newItem.itemImages = this.imageUploadComponent.imageDetails;

    console.log("add-inventory", this.newItem);

    this.itemService.add(this.newItem).subscribe(
      result => {
        EmitterService.get("ITEM_ADD").emit(this.newItem);
        this.navCtrl.pop();
      },
      err => {
        console.log(err);
      });
  }

}
