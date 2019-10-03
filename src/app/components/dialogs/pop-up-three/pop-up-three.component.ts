import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PopUpService } from '../../../services/pop-up/pop-up.service';

interface IData {
  name: string;
  age: number;
}

@Component({
  selector: 'app-pop-up-three',
  templateUrl: './pop-up-three.component.html',
  styleUrls: ['./pop-up-three.component.scss']
})

export class PopUpThreeComponent implements OnInit {
  @Input() payload$: Observable<IData>;

  constructor(private popUpService: PopUpService) {}
  ngOnInit() {}

  public openPopUp(popUpName: string) {
    this.popUpService.openPopUp({ name: popUpName });
  }
}
