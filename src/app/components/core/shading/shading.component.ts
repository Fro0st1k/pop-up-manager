import { Component, OnInit } from '@angular/core';
import { PopUpService } from '../../../services/pop-up/pop-up.service';
import { Observable } from 'rxjs';
import { IPopUpState } from '../../../entities/pop-up';

@Component({
  selector: 'app-shading',
  templateUrl: './shading.component.html',
  styleUrls: ['./shading.component.scss']
})

export class ShadingComponent implements OnInit {
  public popUpState$: Observable<IPopUpState>;
  constructor(private popUpService: PopUpService) {}

  ngOnInit() {
    this.popUpState$ = this.popUpService.popUpState$;
  }

  public closePopUp() {
    this.popUpService.closePopUp();
  }
}
