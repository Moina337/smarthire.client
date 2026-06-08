import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CandidateService } from '../../../core/services/candidate';
import { Route } from '@angular/router';

@Component({
  selector: 'app-job-apply',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-apply.html'
})
export class JobApply {

  private route = inject(ActivatedRoute);
  private candidateService = inject(CandidateService);
  private router = inject(Router);

  jobId!: number;

  ngOnInit() {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
  }

  apply() {
    this.candidateService
      .apply(this.jobId)
      .subscribe({

      next: () => {

        alert('Candidature envoyée');

        // Optionnel : rediriger vers les candidatures
        this.router.navigate(['/candidate/applications']);

      },

      error: (err) => {
        console.log(err);
      }
    });
  }
}
