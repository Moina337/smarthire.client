import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Job } from '../models/job'; 
import { PageResponse } from '../models/page-response.model'; 

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getJobs(
    keyword: string = '',
    page: number = 0,
    size: number = 6
  ) {

    return this.http.get<PageResponse<Job>>(
      `${this.baseUrl}/public/jobs?keyword=${keyword}&page=${page}&size=${size}`
    );
  }

  getJobById(id: number) {

    return this.http.get<Job>(
      `${this.baseUrl}/public/jobs/${id}`
    );

  }

}