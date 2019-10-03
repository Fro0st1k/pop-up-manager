import { Component, OnInit } from '@angular/core';
import { PopUpService } from '../../../services/pop-up/pop-up.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-pop-up-one',
  templateUrl: './pop-up-one.component.html',
  styleUrls: ['./pop-up-one.component.scss']
})

export class PopUpOneComponent implements OnInit {
  constructor(private popUpService: PopUpService) {}
  ngOnInit() {}

  public openPopUp(popUpName: string) {
    this.popUpService.openPopUp({ name: popUpName, payload$: of({ name: 'Alex', age: 20 }) });
  }
}
