import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { CandidateService } from '../../../core/services/candidate';
import { CandidatProfil } from '../../../core/models/candidatProfil';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

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

    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.candidateService.uploadCv(formData)
      .subscribe({
        next: () => {
          // refresh profil après upload
          this.candidateService.getProfile()
            .subscribe();
        }
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