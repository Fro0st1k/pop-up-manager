import { Observable } from 'rxjs';
import { ViewRef } from '@angular/core';

export interface IPopUpState {
  isOpen?: boolean;
  payload$?: Observable<any>;
  name?: string;
  isLocked?: boolean;
  viewRef?: ViewRef;
}

export interface IPopUpData {
  type: string;
  payload: any;
}
