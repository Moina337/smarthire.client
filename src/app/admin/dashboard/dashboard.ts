import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class AdminDashboard {
  private adminService = inject(AdminService);

  candidates = toSignal(this.adminService.getCandidates(), { initialValue: [] });
  jobs = toSignal(this.adminService.getJobs(), { initialValue: [] });
  applications = toSignal(this.adminService.getApplications(), { initialValue: [] });

  totalCandidates = computed(() => this.candidates().length);
  totalJobs = computed(() => this.jobs().length);
  totalApplications = computed(() => this.applications().length);
}
