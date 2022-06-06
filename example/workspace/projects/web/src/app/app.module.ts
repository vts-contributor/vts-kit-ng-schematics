import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const IMPORT = [
  BrowserModule,
  AppRoutingModule,
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...IMPORT
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
