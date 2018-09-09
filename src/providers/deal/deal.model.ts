import { DateTime } from "ionic-angular";
import { BaseModel } from "../base.model";
import { Collection } from "../collection/collection.model";
import { Item } from "../item/item.model";
import { AppUser } from "../app-user.model";

export class Deal extends BaseModel {
    dealDetailId: number;
    aliasName: string;
    createdByCollectionDetailId: string;
    tags: string;
    createdDateTime: DateTime;
    updatedDateTime: DateTime;

    referencedCollectionDetail: Collection;
    dealItemDetails: DealItem[]
}

export class DealItem extends BaseModel {
    dealItemDetailId: number;
    dealDetailId: number;
    transferQuantity: number;
    transferApproved: boolean;
    transferDateTime: string;
    newReferenceCollectionDetailId: string;
    currentReferenceCollectionDetailId: string;

    senderCollectionDetail: Collection;
    sender: AppUser;
    itemDetail: Item;
}
