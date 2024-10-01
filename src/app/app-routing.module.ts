import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

// Define routes for your application
const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Default route for landing page
  { path: 'admin', component: AdminPageComponent } // Route for admin page
];

// Export the routes to be used in main.ts
export const appRoutes = provideRouter(routes);
