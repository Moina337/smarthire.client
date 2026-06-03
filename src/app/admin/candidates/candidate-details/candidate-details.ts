import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminCandidate } from '../../../../core/models/admin.models';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-admin-candidate-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidate-details.html',
  styleUrls: ['./candidate-details.css']
})
export class CandidateDetails implements OnInit {
  private adminService = inject(AdminService);
  private route = inject(ActivatedRoute);

  candidate = signal<AdminCandidate | null>(null);
  loading = signal(false);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading.set(true);
    this.adminService.getCandidateById(id).subscribe({
      next: data => {
        this.candidate.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
