import { Component, HostListener, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IPopUpState } from '../../../entities/pop-up';
import { PopUpManagerService } from '../../../services/pop-up-manager/pop-up-manager.service';
import { takeUntil } from 'rxjs/operators';
import { PopUpService } from '../../../services/pop-up/pop-up.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pop-up-container',
  templateUrl: './pop-up-container.component.html',
  styleUrls: ['./pop-up-container.component.scss']
})

export class PopUpContainerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  @ViewChild('container', { read: ViewContainerRef, static: true }) containerRef: ViewContainerRef;

  constructor(
    private popUpManagerService: PopUpManagerService,
    private popUpService: PopUpService
  ) {}

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    event.stopPropagation();
  }

  ngOnInit() {
    this.onPopUpStateChange();
  }

  public renderPopUp(state: IPopUpState): void {
    if (state.viewRef) {
      this.containerRef.clear();
      this.containerRef.insert(state.viewRef);
      return;
    }

    const compFactory = this.popUpManagerService.getPopUpComponentFactory(state.name);
    this.clearContainer();
    const popUpComponent = this.containerRef.createComponent(compFactory);

    if (state.payload$) {
      popUpComponent.instance.payload$ = state.payload$;
    }
  }

  public clearContainer(): void {
    this.popUpService.safePopUpView(this.containerRef.detach());
    this.containerRef.clear();
  }

  private onPopUpStateChange() {
    this.popUpService.popUpState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: IPopUpState) => {
        state.isOpen
          ? this.renderPopUp(state)
          : this.clearContainer();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
