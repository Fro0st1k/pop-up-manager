import { Observable } from 'rxjs';

export interface IPopUpState {
  isOpen?: boolean;
  payload$?: Observable<any>;
  name?: string;
}

export interface IPopUpData {
  type: string;
  payload: any;
}
