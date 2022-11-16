import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import { DevicestatComponent } from './devicestat/devicestat.component';
import {HeaderInterceptor, NullInterceptor, PicommService} from "./picomm.service";

@NgModule({
  declarations: [
    AppComponent,
    DevicestatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientJsonpModule
  ],
  providers: [PicommService,
    {provide: HTTP_INTERCEPTORS,
    useClass: NullInterceptor,
    multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
