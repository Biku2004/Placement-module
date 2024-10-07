import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  records = [
    { id: 1, name: 'John Doe', company: 'Google', role: 'Software Engineer', status: 'Placed' },
    { id: 2, name: 'Jane Smith', company: 'Microsoft', role: 'Data Analyst', status: 'Interview' },
    // More records...
  ];

  addRecord() {
    console.log('Add Record');
    // Code for adding a record
  }

  editRecord() {
    console.log('Edit Record');
    // Code for editing a record
  }

  deleteRecord() {
    console.log('Delete Record');
    // Code for deleting a record
  }
}
