import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deal, DealItem } from './deal.model';

// Import RxJs required methods
import 'rxjs/add/operator/catch';
import { BaseService } from '../base.service';

@Injectable()
export class DealService extends BaseService<Deal> {

  constructor(
    httpClient: HttpClient
  ) {
    super(httpClient, ["Deal"]);

  }

  public getAllByCollectionDetailId(collectionDetailId: string) {
    return this.httpClient
      .get<Deal[]>([
        this.url,
        this.baseEndpoints.join("/"),
        collectionDetailId
      ].join("/"));
  }

  public addDealItem(data: DealItem) {
    return this.httpClient
      .post<DealItem>([
        this.url,
        this.baseEndpoints.join("/"),
        "Item"
      ].join("/"), data, this.httpOptions);
  }

  public getDealIem(id: number) {
    return this.httpClient
      .get<Deal>([
        this.url,
        this.baseEndpoints.join("/"),
        "Item",
        id
      ].join("/"));
  }
}
