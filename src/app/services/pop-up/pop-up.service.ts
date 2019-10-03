import { Injectable, ViewRef } from '@angular/core';
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
    if (this.isPopUpLocked()) {
      return;
    }
    this.removePopUpFromStack();
    if (this.hasMorePopUpsInStack()) {
      this.renderPreviousPopUp();
    } else {
      this.setPopUpState({ isOpen: false });
    }
  }

  public removeUnlock(isCloseNeeded?: boolean) {
    this.getCurrentPopUpState().isLocked = false;
    if (isCloseNeeded) {
      this.closePopUp();
    }
  }

  private isPopUpLocked(): boolean {
    return this.getCurrentPopUpState().isLocked;
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

  public safePopUpView(viewRef: ViewRef) {
    const prevPopUpState = this.getPreviousPopUpState();
    if (prevPopUpState) {
      prevPopUpState.viewRef = viewRef;
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

  private getPreviousPopUpState(): IPopUpState {
    return this.popUpsStack[this.popUpsStack.length - 2];
  }

  public transferDataFromPopUp(dataFromPopUp: IPopUpData | any): void {
    this.popUpTransferData.next(dataFromPopUp);
  }
}
