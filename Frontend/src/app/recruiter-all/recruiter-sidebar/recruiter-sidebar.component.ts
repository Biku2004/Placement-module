import { Component } from '@angular/core';
import { SidebarService } from '../../Staff/staff-all/sidebar/sidebar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recruiter-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './recruiter-sidebar.component.html',
  styleUrl: './recruiter-sidebar.component.css'
})
export class RecruiterSidebarComponent {
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
