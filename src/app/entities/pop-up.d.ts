import { Observable } from 'rxjs';

export interface IPopUpState {
  isOpen?: boolean;
  payload$?: Observable<any>;
  name?: string;
  isLocked?: boolean;
}

export interface IPopUpData {
  type: string;
  payload: any;
}
