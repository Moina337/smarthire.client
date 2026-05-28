import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import { JobService } from '../../../core/services/job.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './jobs.html',
  styleUrls: ['./jobs.css']
})
export class Jobs {

  private jobService = inject(JobService);

  keyword = signal('');
  page = signal(0);
  size = signal(6);

  private params$ = toObservable(
    computed(() => ({
      keyword: this.keyword(),
      page: this.page(),
      size: this.size()
    }))
  );

  jobsPage = toSignal(
    this.params$.pipe(
      switchMap(params =>
        this.jobService.getJobs(
          params.keyword,
          params.page,
          params.size
        )
      )
    ),
    {
      initialValue: {
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0,
        size: 6
      }
    }
  );

  jobs = computed(() => this.jobsPage().content);

  nextPage() {
    if (this.page() < this.jobsPage().totalPages - 1) {
      this.page.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.page() > 0) {
      this.page.update(p => p - 1);
    }
  }

  search(value: string) {
    this.keyword.set(value);
    this.page.set(0);
  }

}