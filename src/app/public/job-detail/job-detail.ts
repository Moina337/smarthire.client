import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../../core/services/job.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Job } from '../../../core/models/job'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-detail.html',
  styleUrls: ['./job-detail.css']
})
export class JobDetail {

  private route = inject(ActivatedRoute);
  private jobService = inject(JobService);

  job = toSignal<Job | null>(
    this.route.paramMap.pipe(
      switchMap(params =>
        this.jobService.getJobById(
          Number(params.get('id'))
        )
      )
    ),
    {
      initialValue: null
    }
  );

}