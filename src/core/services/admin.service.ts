import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  AdminApplication,
  AdminCandidate,
  AdminJob,
  JobRequest,
  ApplicationStatus
} from '../models/admin.models';
import { PageResponse } from '../models/page-response.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/admin`;

  // ---------------- APPLICATIONS ----------------

  getApplications(): Observable<AdminApplication[]> {
    return this.http.get<PageResponse<AdminApplication> | AdminApplication[]>(`${this.baseUrl}/applications`).pipe(
      map((response) => (Array.isArray(response) ? response : response?.content ?? []))
    );
  }

  getApplicationById(id: number): Observable<AdminApplication> {
    return this.http.get<AdminApplication>(`${this.baseUrl}/applications/${id}`);
  }

  updateApplicationStatus(
    id: number,
    status: ApplicationStatus
  ): Observable<AdminApplication> {

    return this.http.put<AdminApplication>(
      `${this.baseUrl}/applications/${id}/status`,
      { status }
    );
  }

  // ---------------- CANDIDATES ----------------

  getCandidates(): Observable<AdminCandidate[]> {
    return this.http.get<PageResponse<AdminCandidate> | AdminCandidate[]>(`${this.baseUrl}/candidates`).pipe(
      map((response) => (Array.isArray(response) ? response : response?.content ?? []))
    );
  }

  getCandidateById(id: number): Observable<AdminCandidate> {
    return this.http.get<AdminCandidate>(`${this.baseUrl}/candidates/${id}`);
  }

  // ---------------- JOBS ----------------

  getJobs(): Observable<AdminJob[]> {
    return this.http.get<PageResponse<AdminJob> | AdminJob[]>(`${this.baseUrl}/jobs`).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return response;
        }

        return response?.content ?? [];
      })
    );
  }

  createJob(job: JobRequest): Observable<AdminJob> {
    return this.http.post<AdminJob>(`${this.baseUrl}/jobs`, job);
  }

  updateJob(id: number, job: JobRequest): Observable<AdminJob> {
    return this.http.put<AdminJob>(`${this.baseUrl}/jobs/${id}`, job);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/jobs/${id}`);
  }
}