import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminApplication } from '../../../../core/models/admin.models';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-admin-application-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './application-details.html',
  styleUrls: ['./application-details.css']
})
export class ApplicationDetails implements OnInit {
  private adminService = inject(AdminService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  application = signal<AdminApplication | null>(null);
  loading = signal(false);

  form = this.fb.nonNullable.group({
    status: ['EN_ATTENTE']
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading.set(true);
    this.adminService.getApplicationById(id).subscribe({
      next: data => {
        this.application.set(data);
        this.form.patchValue({ status: data.statut });
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  updateStatus(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const status = this.form.get('status')?.value ?? 'EN_ATTENTE';
    this.adminService.updateApplicationStatus(id, status).subscribe({
      next: data => this.application.set(data)
    });
  }
}
