import { Component, Output, EventEmitter } from '@angular/core';
// import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from './sidebar.service';
import { Router } from '@angular/router'; // Import the Router
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

// export class SidebarComponent {
//   @Output() selectItem = new EventEmitter<string>();

//   onSelectItem(item: string) {
//     this.selectItem.emit(item);
//   }
// }

// export class SidebarComponent {
//   constructor(private sidebarService: SidebarService) {}

//   onSelectItem(item: string, event: Event) {
//     event.preventDefault();
//     this.sidebarService.setSelectedItem(item);
//   }
// }

export class SidebarComponent {
  selectedItems$ = this.sidebarService.selectedItems$;

  constructor(
    private sidebarService: SidebarService,
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


  // openCreateJob(): void {
  //   this.router.navigate(['/create-job']);
  // }
  
}
