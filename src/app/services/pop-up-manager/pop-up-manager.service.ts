import { ComponentFactory, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { PopUpOneComponent } from '../../components/dialogs/pop-up-one/pop-up-one.component';
import { PopUpTwoComponent } from '../../components/dialogs/pop-up-two/pop-up-two.component';
import { PopUpThreeComponent } from '../../components/dialogs/pop-up-three/pop-up-three.component';
import { PopUpFourComponent } from '../../components/dialogs/pop-up-four/pop-up-four.component';

@Injectable({
  providedIn: 'root'
})

export class PopUpManagerService {
  private popUpList = {
    login: PopUpOneComponent,
    leftSideMenu: PopUpTwoComponent,
    popUpWithData: PopUpThreeComponent,
    locked: PopUpFourComponent,
  };

  private popUpFactories = {};

  constructor(private injector: Injector, private componentFactoryResolver: ComponentFactoryResolver) {}

  private createPopUpComponentFactory(popUpComponentName: string): ComponentFactory<any> {
    this.popUpFactories[popUpComponentName] = this.componentFactoryResolver.resolveComponentFactory(this.popUpList[popUpComponentName]);
    return this.popUpFactories[popUpComponentName];
  }

  public getPopUpComponentFactory(popUpComponentName: string): ComponentFactory<any> {
    return this.popUpFactories[popUpComponentName]
      ? this.popUpFactories[popUpComponentName]
      : this.createPopUpComponentFactory(popUpComponentName);
  }
}
