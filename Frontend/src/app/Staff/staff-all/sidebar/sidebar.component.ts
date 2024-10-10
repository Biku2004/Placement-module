import { Component, Output, EventEmitter } from '@angular/core';
import { SidebarService } from './sidebar.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
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

  constructor(private sidebarService: SidebarService) {}

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
