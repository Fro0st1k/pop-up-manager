import { Component, OnInit } from '@angular/core';
import { PopUpService } from '../../../services/pop-up/pop-up.service';

@Component({
  selector: 'app-pop-up-two',
  templateUrl: './pop-up-two.component.html',
  styleUrls: ['./pop-up-two.component.scss']
})

export class PopUpTwoComponent implements OnInit {
  private data = [1, 2, 3, 4, 5];

  constructor(private popUpService: PopUpService) {}

  ngOnInit() {}

  public sendData() {
    this.popUpService.transferDataFromPopUp({ type: 'forAppCmp', payload: this.data });
  }
}
