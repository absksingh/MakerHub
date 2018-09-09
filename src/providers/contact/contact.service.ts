import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Contact } from './contact.model';

@Injectable()
export class ContactService extends BaseService<Contact> {

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, ["Contact"])
  }
}
