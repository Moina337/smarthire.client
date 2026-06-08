import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminCandidate } from '../../../../core/models/admin.models';
import { AdminService } from '../../../../core/services/admin.service';
import { environment } from '../../../../environments/environment';

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
  private http = inject(HttpClient);

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

  // Voir le CV
  voirCv(cvUrl: string | undefined) {
    if (!cvUrl) {
      alert('Aucun CV disponible');
      return;
    }
    // Construire l'URL complète
    let fullUrl: string;
    if (cvUrl.startsWith('/')) {
      // URL avec chemin absolu: /api/files/cv/...
      fullUrl = environment.apiBaseUrl + cvUrl;
    } else {
      // Juste le nom du fichier
      fullUrl = environment.apiBaseUrl + '/api/files/cv/' + cvUrl;
    }
    window.open(fullUrl, '_blank');
  }

  // Télécharger le CV
  telechargerCv(cvUrl: string | undefined) {
    if (!cvUrl) {
      alert('Aucun CV disponible');
      return;
    }
    let fullUrl: string;
    if (cvUrl.startsWith('/')) {
      fullUrl = environment.apiBaseUrl + cvUrl;
    } else {
      fullUrl = environment.apiBaseUrl + '/api/files/cv/' + cvUrl;
    }

    this.http.get(fullUrl, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const filename = (cvUrl.split('/').pop() || 'cv.pdf').replace(/\?.*$/, '');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      },
      error: () => alert('Impossible de télécharger le CV')
    });
  }
}
