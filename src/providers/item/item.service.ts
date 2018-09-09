import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from './item.model';

// Import RxJs required methods
import 'rxjs/add/operator/catch';
import { BaseService } from '../base.service';

@Injectable()
export class ItemService extends BaseService<Item> {

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, ["Item"]);
  }

}
