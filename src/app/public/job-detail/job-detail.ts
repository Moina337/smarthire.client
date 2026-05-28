import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../../core/services/job.service';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-detail.html',
  styleUrls: ['./job-detail.css']
})
export class JobDetail implements OnInit {

  job: any;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit(): void {

    const id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    this.loadJob(id);
  }

  loadJob(id: number): void {

    this.jobService
      .getJobById(id)
      .subscribe({

        next: (response) => {
          this.job = response;
        },

        error: (err) => {
          console.error(err);
        }

      });
  }
}