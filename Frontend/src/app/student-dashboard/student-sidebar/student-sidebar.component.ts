import { Component, Output, EventEmitter } from '@angular/core';
// import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentSidebarService } from './studentSidebar.service';
import { Router } from '@angular/router'; // Import the Router


@Component({
  selector: 'app-student-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './student-sidebar.component.html',
  styleUrl: './student-sidebar.component.css'
})

export class StudentSidebarComponent {
  selectedItems$ = this.sidebarService.selectedItems$;

  constructor(
    private sidebarService: StudentSidebarService,
    private router: Router,
  ) {}

  onSelectItem(item: string, event: Event) {
    event.preventDefault();
    this.sidebarService.toggleSelectedItem(item);
  }

  isSelected(item: string): boolean {
    let isSelected = false;
    this.selectedItems$.subscribe(items => {
      isSelected = items.includes(item);
    });
    return isSelected;
  }
  
}
