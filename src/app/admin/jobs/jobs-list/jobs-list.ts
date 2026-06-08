import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminJob } from '../../../../core/models/admin.models';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-admin-jobs-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './jobs-list.html',
  styleUrls: ['./jobs-list.css']
})
export class JobsList implements OnInit {
  private adminService = inject(AdminService);

  jobs = signal<AdminJob[]>([]);
  keyword = signal('');
  page = signal(0);
  pageSize = 6;
  loading = signal(false);

  filteredJobs = computed(() => {
    const term = this.keyword().toLowerCase();
    return this.jobs().filter(job =>
      job.titre.toLowerCase().includes(term) || job.description.toLowerCase().includes(term)
    );
  });

  pagedJobs = computed(() => {
    const start = this.page() * this.pageSize;
    return this.filteredJobs().slice(start, start + this.pageSize);
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredJobs().length / this.pageSize)));

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.loading.set(true);
    this.adminService.getJobs().subscribe({
      next: data => {
        this.jobs.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onDelete(id: number): void {
    if (!confirm('Supprimer cette offre ?')) {
      return;
    }

    this.adminService.deleteJob(id).subscribe(() => this.loadJobs());
  }

  nextPage(): void {
    if (this.page() < this.totalPages() - 1) {
      this.page.update(value => value + 1);
    }
  }

  prevPage(): void {
    if (this.page() > 0) {
      this.page.update(value => value - 1);
    }
  }

  setSearch(value: string): void {
    this.keyword.set(value);
    this.page.set(0);
  }
}
