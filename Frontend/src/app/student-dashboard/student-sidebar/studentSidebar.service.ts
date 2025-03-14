import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentSidebarService {
  private selectedItemsSubject = new BehaviorSubject<string[]>(this.loadSelectedItems());
  selectedItems$ = this.selectedItemsSubject.asObservable();

  private loadSelectedItems(): string[] {
    const items = localStorage.getItem('selectedItems');
    return items ? JSON.parse(items) : [];
  }

  private saveSelectedItems(items: string[]) {
    localStorage.setItem('selectedItems', JSON.stringify(items));
  }

  toggleSelectedItem(item: string) {
    const currentItems = this.selectedItemsSubject.value;
    const index = currentItems.indexOf(item);
    if (index > -1) {
      currentItems.splice(index, 1);
    } else {
      currentItems.push(item);
    }
    this.selectedItemsSubject.next([...currentItems]);
    this.saveSelectedItems(currentItems);
  }
}