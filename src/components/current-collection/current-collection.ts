import { Component } from '@angular/core';
import { ProfileService } from '../../core/profile.service';

@Component({
  selector: 'current-collection',
  templateUrl: 'current-collection.html'
})
export class CurrentCollectionComponent {

  constructor(
    private profile: ProfileService
  ) {

  }

}
