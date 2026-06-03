import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { CandidateService } from '../../../core/services/candidate';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applications.html',
  styleUrls: ['./applications.css']
})
export class Applications {

  private candidateService =
    inject(CandidateService);

  applications = toSignal<any[]>(

    this.candidateService.getApplications() as any,

    {
      initialValue: undefined
    }

  );

  getStatusClass(statut: string) {

    switch(statut) {

      case 'EN_ATTENTE':
        return 'bg-yellow-100 text-yellow-700';

      case 'ACCEPTEE':
        return 'bg-green-100 text-green-700';

      case 'REFUSEE':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

}