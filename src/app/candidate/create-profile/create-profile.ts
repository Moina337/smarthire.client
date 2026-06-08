import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CandidateService } from '../../../core/services/candidate';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-profile.html',
  styleUrls: ['./create-profile.css']
})
export class CreateProfile {

  titreProfil = '';
  experience = 0;
  competences = '';

  loading = false;
  errorMessage = '';

  constructor(
    private candidateService: CandidateService,
    private router: Router
  ) {}

  createProfile() {

    this.loading = true;

    const data = {

      titreProfil: this.titreProfil,

      experience: this.experience,

      competences:
        this.competences
          .split(',')
          .map(c => c.trim())

    };

    this.candidateService
      .createProfile(data)
      .subscribe({

        next: () => {

          alert('Profil candidat créé avec succès !');

          this.router.navigate([
            '/candidate/profile'
          ]);
        },

        error: (err) => {

          console.log(err);

          this.errorMessage =
            'Création impossible';

          alert('Erreur lors de la création du profil. Veuillez réessayer.');

          this.loading = false;
        },

        complete: () => {

          this.loading = false;
        }

      });
  }

}