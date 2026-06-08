import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-admin-job-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './job-form.html',
  styleUrls: ['./job-form.css']
})
export class JobForm implements OnInit {
  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEdit = signal(false);
  loading = signal(false);

  form = this.fb.nonNullable.group({
    titre: ['', Validators.required],
    description: ['', Validators.required],
    experienceMin: [0, [Validators.required, Validators.min(0)]],
    competencesRequises: ['Angular, Spring Boot', Validators.required]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.loading.set(true);
      this.adminService.getJobs().subscribe({
        next: jobs => {
          const job = jobs.find(item => item.id === Number(id));
          if (job) {
            this.form.patchValue({
              titre: job.titre,
              description: job.description,
              experienceMin: job.experienceMin,
              competencesRequises: job.competencesRequises.join(', ')
            });
          }
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const competences = raw.competencesRequises
      .split(',')
      .map((value: string) => value.trim())
      .filter(Boolean);

    const payload = {
      ...raw,
      competencesRequises: competences
    };
    this.loading.set(true);

    const request = this.isEdit()
      ? this.adminService.updateJob(Number(this.route.snapshot.paramMap.get('id')), payload)
      : this.adminService.createJob(payload);

    request.subscribe({
      next: () => this.router.navigate(['/admin/jobs']),
      error: () => this.loading.set(false)
    });
  }
}
