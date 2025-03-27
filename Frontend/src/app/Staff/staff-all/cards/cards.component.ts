import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobApplicationStats } from './job-applicant-stats';
import { JobApplicationStatsService } from './job-application-stats.service';
@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {
  stats: JobApplicationStats = {
    totalApplications: 0,
    interviewsAttended: 0,
    interviewPercentage: 0,
    offersReceived: 0,
    rejectedOffers: 0
  };

  constructor(private statsService: JobApplicationStatsService) {}

  ngOnInit(): void {
    this.fetchStats();
  }

  fetchStats(): void {
    this.statsService.getStats().subscribe({
      next: (data) => {
        console.log('Fetched stats:', data); // Debug the response
        this.stats = data;
      },
      error: (err) => {
        console.error('Error fetching stats:', err); // Log any errors
        console.log('Error details:', err.error);
      },
      complete: () => {
        console.log('Fetch completed, stats:', this.stats); // Confirm data assignment
      }
    });
  }
}