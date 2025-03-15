import { Component } from '@angular/core';
import { SidebarService } from '../../Staff/staff-all/sidebar/sidebar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.css']
})
export class StudentSidebarComponent {
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
  
}
