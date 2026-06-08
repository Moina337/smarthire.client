import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminApplication, ApplicationStatus } from '../../../../core/models/admin.models';
import { AdminService } from '../../../../core/services/admin.service';
import { environment } from '../../../../environments/environment';

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
  private http = inject(HttpClient);

  application = signal<AdminApplication | null>(null);
  loading = signal(false);

  form = this.fb.nonNullable.group({
    status: this.fb.nonNullable.control<ApplicationStatus>('EN_ATTENTE')
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading.set(true);
    this.adminService.getApplicationById(id).subscribe({
      next: data => {
        this.application.set(data);
        this.form.patchValue({ status: (data.statut ?? 'EN_ATTENTE') as ApplicationStatus });
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  updateStatus(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const status = (this.form.get('status')?.value ?? 'EN_ATTENTE') as ApplicationStatus;
    this.adminService.updateApplicationStatus(id, status).subscribe({
      next: data => this.application.set(data)
    });
  }
  
  // Voir le CV
  voirCv(cvUrl: string | undefined) {
    if (!cvUrl) {
      alert('Aucun CV disponible');
      return;
    }
    // Construire l'URL complète en supportant deux formats de cvUrl
    let fullUrl: string;
    if (cvUrl.startsWith('/')) {
      // cvUrl contient déjà le chemin (ex: /api/files/cv/xxx.pdf)
      fullUrl = environment.apiBaseUrl + cvUrl;
    } else {
      // cvUrl contient seulement le nom de fichier
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
