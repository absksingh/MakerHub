export class AppUserProfile {
    appUserDetailId: number;
    firstName: string;
    lastName: string;
    userName: string;
    emailAddress: string;
    mobileNumber: string;
    profileImageUrl: string;

    appUserCollectionDetails: AppUserProfileCollection[];
}

export class AppUserProfileCollection {
    collectionDetailId: string;
    collectionName: string;
    collectionCoverImageUrl: string;
    inventoryCount: number;
    totalAppUserCount: number;
    onlineAppUserCount: number;
}