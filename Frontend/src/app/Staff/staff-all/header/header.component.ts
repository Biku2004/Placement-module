// import { Component, OnInit} from '@angular/core';
// import { AuthService } from '../../../service/auth.service';
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';


// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [
//     CommonModule
//   ],
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.css'
// })
// export class HeaderComponent implements OnInit {
//   user: { name: string; role: string } | null = null;

//   constructor(private authService: AuthService) {}

//   ngOnInit(): void {
//     const userDetails = this.authService.getUser();
//     if (userDetails && 'name' in userDetails && 'role' in userDetails) {
//       this.user = { name: userDetails.name as string, role: userDetails.role as string };
//     } else {
//       this.user = null;
//     }
//   }
// }


// header.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  name: string | undefined;
  role: string | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(data => {
      this.name = data.name;
      this.role = data.role;
    });
  }
}