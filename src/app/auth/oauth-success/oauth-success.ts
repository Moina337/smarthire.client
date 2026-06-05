import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oauth2-success',
  standalone: true,
  template: `<p>Connexion en cours...</p>`
})
export class OAuth2SuccessComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {

    const token =
      this.route.snapshot.queryParamMap.get('token');

    if (token) {

      localStorage.setItem('token', token);

      this.router.navigate(['/candidate']);
    }
  }
}