import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css']
})
export class AdminLayout {
  readonly links = [
    { label: 'Tableau de bord', path: '/admin' },
    { label: 'Offres', path: '/admin/jobs' },
    { label: 'Candidats', path: '/admin/candidates' },
    { label: 'Candidatures', path: '/admin/applications' }
  ];
}
