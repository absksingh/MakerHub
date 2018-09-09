import { BaseModel } from "../base.model";

export class Collection extends BaseModel {
    collectionDetailId: string;
    collectionDetailName: string;
    profileImageUrl: string;

    private _appUserDetailId: number;
    public get appUserDetailId(): number {
        return this._appUserDetailId;
    }
    public set appUserDetailId(v: number) {
        this._appUserDetailId = v;
    }

    private _collectionInventoryCount: number;
    public get collectionInventoryCount(): number {
        return this._collectionInventoryCount;
    }
    public set collectionInventoryCount(v: number) {
        this._collectionInventoryCount = v;
    }

    private _collectionUserCount: number;
    public get collectionUserCount(): number {
        return this._collectionUserCount;
    }
    public set collectionUserCount(v: number) {
        this._collectionUserCount = v;
    }

    private _userIsAdmin: string;
    public get userIsAdmin(): string {
        return this._userIsAdmin;
    }
    public set userIsAdmin(v: string) {
        this._userIsAdmin = v;
    }

    private _userIsVerifiedMember: boolean;
    public get userIsVerifiedMember(): boolean {
        return this._userIsVerifiedMember;
    }
    public set userIsVerifiedMember(v: boolean) {
        this._userIsVerifiedMember = v;
    }


}