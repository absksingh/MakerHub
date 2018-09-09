import { BaseModel } from "./base.model";
import { ImageDetail } from "./item/item.model";

export class RegisterUser extends BaseModel {
    externalId: string;
    firstName: string;
    lastName: string;
    appUserName: string;
    appUserEmailAddress: string;
    appUserMobile: string;
    userProfileImage: ImageDetail;
    collectionName: string;
    collectionCoverImage: ImageDetail;
}