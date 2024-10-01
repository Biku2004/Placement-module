import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

@NgModule({
  declarations: [
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    LandingPageComponent
  ],
  providers: [],
  
})
export class AppModule { }
