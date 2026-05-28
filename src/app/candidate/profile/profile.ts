import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { CandidateService } from '../../../core/services/candidate';
import { CandidatProfil } from '../../../core/models/candidatProfil'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {

  private candidateService = inject(CandidateService);

    // Dans votre profile.ts
profile = toSignal<CandidatProfil | undefined>(
  // Correction : On force l'observable à être reconnu comme un Observable<CandidatProfil>
  this.candidateService.getProfile() as Observable<CandidatProfil>,
  { initialValue: undefined }
);


}
