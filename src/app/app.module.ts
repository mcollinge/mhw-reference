import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AppComponent } from "./app.component";
import * as fromStore from "./store";
import * as fromServices from "./services";
import { FileSaveComponent } from "./components/file-save/file-save.component";
import { LargeMonstersModule } from "./large-monsters/large-monsters.module";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(fromStore.reducers),
    EffectsModule.forRoot(fromStore.effects),
    LargeMonstersModule,
    AppRoutingModule
  ],
  providers: [...fromServices.services],
  bootstrap: [AppComponent]
})
export class AppModule {}
