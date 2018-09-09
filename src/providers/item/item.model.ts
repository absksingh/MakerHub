import { BaseModel } from "../base.model";
import { Collection } from "../collection/collection.model";

export class Item extends BaseModel {
    itemDetailId: number;
    itemName: string;
    height: string;
    weight: string;
    itemQuantity: number;
    tags: string;

    itemImages: ImageDetail[];
    currrentReferenceCollectionDetail: Collection;
}

export class ImageDetail {
    imageId: number;
    mimeType: string;
    caption: string;
    imageUrl: string;
}