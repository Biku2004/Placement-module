import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-data',
  standalone: true,
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  imports: [
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    NgFor,
    NgIf
  ]
})
export class DataComponent {
  displayedColumns: string[] = ['name', 'age', 'actions'];
  dataSource = [{ name: 'John Doe', age: 30 }];

  addRow() {
    this.dataSource.push({ name: '', age: 0 });
  }

  deleteRow(index: number) {
    this.dataSource.splice(index, 1);
  }

  saveData() {
    console.log('Data Saved:', this.dataSource);
  }

  updateName(event: Event, index: number) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dataSource[index].name = inputValue;
  }

  updateAge(event: Event, index: number) {
    const inputValue = +(event.target as HTMLInputElement).value;
    this.dataSource[index].age = inputValue;
  }
}
