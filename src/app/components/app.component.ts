import { Component } from '@angular/core';
import { PopUpService } from '../services/pop-up/pop-up.service';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IPopUpData } from '../entities/pop-up';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public dataFromPopUp$: Observable<IPopUpData>;

  constructor(private popUpService: PopUpService) {
    this.dataFromPopUp$ = this.popUpService.popUpTransferData$
      .pipe(filter(({ type }) => type === 'forAppCmp'));
  }

  public openPopUp(popUpName: string) {
    this.popUpService.openPopUp({ name: popUpName, payload$: of({ name: 'Alex', age: 20 }) });
  }
}
