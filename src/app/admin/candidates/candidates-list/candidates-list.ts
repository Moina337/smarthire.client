import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminCandidate } from '../../../../core/models/admin.models';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-admin-candidates-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './candidates-list.html',
  styleUrls: ['./candidates-list.css']
})
export class CandidatesList implements OnInit {
  private adminService = inject(AdminService);

  candidates = signal<AdminCandidate[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    this.loading.set(true);
    this.adminService.getCandidates().subscribe({
      next: data => {
        this.candidates.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
