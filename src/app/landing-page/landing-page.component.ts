// import { Component } from '@angular/core';
// import { NavbarComponent } from "../navbar/navbar.component";

// @Component({
//   selector: 'app-landing-page',
//   standalone: true,
//   imports: [NavbarComponent],
//   templateUrl: './landing-page.component.html',
//   styleUrl: './landing-page.component.css'
// })
// export class LandingPageComponent {
//   navigateTo(route: string) {
//     this.router.navigate([route]);
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(private router: Router) {} // Inject the Router service

  navigateTo(route: string) {
    this.router.navigate([route]); // Use this.router to navigate
  }
}
