import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IPopUpData, IPopUpState } from '../../entities/pop-up';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PopUpService {
  private popUpState = new Subject<IPopUpState>();
  public popUpState$ = this.popUpState.asObservable().pipe(share());
  private popUpTransferData = new Subject<IPopUpData>();
  public popUpTransferData$ = this.popUpTransferData.asObservable();

  private popUpsStack = [] as IPopUpState[];

  constructor() {}

  public openPopUp(popUpOptions: IPopUpState): void {
    const options: IPopUpState = {
      ...popUpOptions,
      isOpen: true
    };
    this.addPopUpToStack(options);
    this.setPopUpState(options);
  }

  public closePopUp(): void {
    this.removePopUpFromStack();
    if (this.hasMorePopUpsInStack()) {
      this.renderPreviousPopUp();
    } else {
      this.setPopUpState({ isOpen: false });
    }
  }

  private setPopUpState(state: IPopUpState): void {
    this.preventBodyScroll(state);
    this.popUpState.next(state);
  }

  private preventBodyScroll(state: IPopUpState): void {
    if (state.isOpen) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = 'unset';
    }
  }

  private addPopUpToStack(state: IPopUpState): void {
    this.popUpsStack.push(state);
  }

  private removePopUpFromStack(): void {
    if (this.hasMorePopUpsInStack()) {
      this.popUpsStack.length = this.popUpsStack.length - 1;
    }
  }

  private hasMorePopUpsInStack(): boolean {
    return !!this.popUpsStack.length;
  }

  private renderPreviousPopUp(): void {
    this.setPopUpState(this.getCurrentPopUpState());
  }

  private getCurrentPopUpState(): IPopUpState {
    return this.popUpsStack[this.popUpsStack.length - 1];
  }

  public transferDataFromPopUp(dataFromPopUp: IPopUpData | any): void {
    this.popUpTransferData.next(dataFromPopUp);
  }
}
