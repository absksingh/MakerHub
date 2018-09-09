import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Collection } from './collection.model';

import 'rxjs/add/operator/map';

@Injectable()
export class CollectionService extends BaseService<Collection> {

  private endpoints: string[];

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, ["Collection"]);
  }

  getCurrentCollection() {

    this.endpoints = ["Collection", "Current"];

    return this.httpClient.get<any>([
      this.url,
      this.endpoints.join("/")
    ].join("/"))
      .map(result => {
        var collection = new Collection();
        collection.collectionDetailId = result.id;
        collection.collectionDetailName = result.collectionName;
        return collection;
      });
  }

}
