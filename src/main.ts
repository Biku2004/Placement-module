import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [appRoutes]
}).catch(err => console.error(err));
 