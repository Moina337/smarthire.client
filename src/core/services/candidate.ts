import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private http = inject(HttpClient);

  private baseUrl =
    'http://localhost:8080/api';

  // PROFIL
  getProfile() {

    return this.http.get(
      `${this.baseUrl}/candidate/profile`
    );
  }

  createProfile(data: any) {

    return this.http.post(
      `${this.baseUrl}/candidate/profile`,
      data
    );
  }

  // CV
  uploadCv(formData: FormData) {

    return this.http.put(
      `${this.baseUrl}/candidate/profile/cv`,
      formData
    );
  }

  // APPLICATIONS
  getApplications() {

    return this.http.get(
      `${this.baseUrl}/candidate/applications`
    );
  }

  apply(jobId: number, file: File) {

  const formData = new FormData();

  formData.append('file', file); // IMPORTANT

  return this.http.post(

    `${this.baseUrl}/candidate/applications/${jobId}`,

    formData

  );

}

}