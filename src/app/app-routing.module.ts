import { RouterModule,Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Define routes for your application
const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Default route for landing page
  { path: 'admin', component: AdminPageComponent }, // Route for admin page
  {path: 'signup', component: SignupComponent }
];
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// Export the routes to be used in main.ts
export const appRoutes = provideRouter(routes);
export class AppRoutingModule {}
