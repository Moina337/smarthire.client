import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { CandidateService } from '../../../core/services/candidate';
import { CandidatProfil } from '../../../core/models/candidatProfil';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {

  private candidateService = inject(CandidateService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);
  selectedFile?: File;

  profile = toSignal<CandidatProfil | undefined>(
    this.candidateService.getProfile() as Observable<CandidatProfil>,
    { initialValue: undefined }
  );

  // sélection fichier
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // upload CV
  uploadCv() {

    if (!this.selectedFile) {
      alert('Veuillez sélectionner un fichier');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.candidateService.uploadCv(formData)
      .subscribe({
        next: () => {
          alert('CV ajouté avec succès !');
          this.selectedFile = undefined;
          // refresh profil après upload
          this.candidateService.getProfile()
            .subscribe();
        },
        error: (err) => {
          console.error('Erreur upload CV:', err);
          alert('Erreur lors de l\'upload du CV. Veuillez réessayer.');
        }
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

  // Télécharger le CV (utilise HttpClient pour inclure l'Authorization header)
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

  // DECONNEXION
  logout() {

    if (confirm('Voulez-vous vous déconnecter ?')) {

      this.authService.logout();

      this.router.navigate([
        '/login'
      ]);

    }
  }
}