import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminApplication } from '../../../../core/models/admin.models';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-admin-applications-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './applications-list.html',
  styleUrls: ['./applications-list.css']
})
export class ApplicationsList implements OnInit {
  private adminService = inject(AdminService);

  applications = signal<AdminApplication[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    this.loading.set(true);
    this.adminService.getApplications().subscribe({
      next: data => {
        this.applications.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
