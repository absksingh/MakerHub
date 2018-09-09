import { BaseModel } from "./base.model";
import { ImageDetail } from "./item/item.model";

export class AppUser extends BaseModel {
    appUserDetailId: number;
    externalId: string;
    appUserName: string;
    firstName: string;
    lastName: string;
    appUserMobile: string;
    profileImageUrl: string;
    profileImage: ImageDetail;
}