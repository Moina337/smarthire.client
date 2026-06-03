import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AdminApplication, AdminCandidate, AdminJob, JobRequest } from '../models/admin.models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/admin`;

  getApplications() {
    return this.http.get<AdminApplication[]>(`${this.baseUrl}/applications`);
  }

  getApplicationById(id: number) {
    return this.http.get<AdminApplication>(`${this.baseUrl}/applications/${id}`);
  }

  updateApplicationStatus(id: number, status: string) {
    return this.http.put<AdminApplication>(`${this.baseUrl}/applications/${id}/status`, { status });
  }

  getCandidates() {
    return this.http.get<AdminCandidate[]>(`${this.baseUrl}/candidates`);
  }

  getCandidateById(id: number) {
    return this.http.get<AdminCandidate>(`${this.baseUrl}/candidates/${id}`);
  }

  getJobs() {
    return this.http.get<AdminJob[]>(`${this.baseUrl}/jobs`);
  }

  createJob(job: JobRequest) {
    return this.http.post<AdminJob>(`${this.baseUrl}/jobs`, job);
  }

  updateJob(id: number, job: JobRequest) {
    return this.http.put<AdminJob>(`${this.baseUrl}/jobs/${id}`, job);
  }

  deleteJob(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/jobs/${id}`);
  }
}
