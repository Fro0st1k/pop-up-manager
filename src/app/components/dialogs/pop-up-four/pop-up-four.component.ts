import { Component, OnInit } from '@angular/core';
import { PopUpService } from '../../../services/pop-up/pop-up.service';

@Component({
  selector: 'app-pop-up-four',
  templateUrl: './pop-up-four.component.html',
  styleUrls: ['./pop-up-four.component.scss']
})

export class PopUpFourComponent implements OnInit {
  constructor(private popUpService: PopUpService) { }
  ngOnInit() {}

  public removeUnlock(): void {
    this.popUpService.removeUnlock(true);
  }
}
