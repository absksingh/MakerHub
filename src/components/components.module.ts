import { NgModule } from '@angular/core';
import { CurrentCollectionComponent } from './current-collection/current-collection';
import { IonicModule } from 'ionic-angular';
import { ImageUploadComponent } from './image-upload/image-upload';
import { CollectionServiceModule } from '../providers/collection/collection-service.module';
import { ItemDetailComponent } from './item-detail/item-detail';
import { ItemListComponent } from './item-list/item-list';
import { DealItemDetailComponent } from './deal-item-detail/deal-item-detail';
import { SingleImageUploadComponent } from './single-image-upload/single-image-upload';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [
		CurrentCollectionComponent,
		ImageUploadComponent,
		ItemDetailComponent,
		ItemListComponent,
		DealItemDetailComponent,
		SingleImageUploadComponent
	],
	imports: [
		IonicModule,
		CommonModule,
		CollectionServiceModule
	],
	exports: [
		CurrentCollectionComponent,
		ImageUploadComponent,
		ItemDetailComponent,
		ItemListComponent,
		DealItemDetailComponent,
		SingleImageUploadComponent
	]
})
export class ComponentsModule { }
