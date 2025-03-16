import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecruiterService } from '../recruiter.service';
import { JwtService } from '../../service/jwt.service';


@Component({
  selector: 'app-communication',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './communication.component.html',
  styleUrl: './communication.component.css'
})

export class CommunicationComponent {
  message = '';

  constructor(private recruiterService: RecruiterService, private jwtService: JwtService) {}

  onSend() {
    const recruiterEmail = this.jwtService.getUserDetails()?.email || '';
    this.recruiterService.sendMessage(recruiterEmail, this.message).subscribe(
      () => {
        this.message = '';
        alert('Message sent');
      },
      (error) => console.error('Error sending message:', error)
    );
  }
}