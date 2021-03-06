import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { ShadingComponent } from './components/core/shading/shading.component';
import { PopUpOneComponent } from './components/dialogs/pop-up-one/pop-up-one.component';
import { PopUpTwoComponent } from './components/dialogs/pop-up-two/pop-up-two.component';
import { PopUpContainerComponent } from './components/core/pop-up-container/pop-up-container.component';
import { PopUpThreeComponent } from './components/dialogs/pop-up-three/pop-up-three.component';
import { PopUpFourComponent } from './components/dialogs/pop-up-four/pop-up-four.component';

@NgModule({
  declarations: [
    AppComponent,
    ShadingComponent,
    PopUpOneComponent,
    PopUpTwoComponent,
    PopUpContainerComponent,
    PopUpThreeComponent,
    PopUpFourComponent,
  ],
  entryComponents: [
    PopUpOneComponent,
    PopUpTwoComponent,
    PopUpThreeComponent,
    PopUpFourComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
