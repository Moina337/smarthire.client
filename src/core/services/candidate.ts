import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private baseUrl =
    environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  getProfile() {

    return this.http.get(
      `${this.baseUrl}/candidate/profile`
    );
  }

}