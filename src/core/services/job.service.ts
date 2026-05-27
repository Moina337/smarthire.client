import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment"; 
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getJobs(page: number, size: number) {
    return this.http.get(
      `${this.baseUrl}/public/jobs?page=${page}&size=${size}`
    );
  }

  getJobById(id: number) {
    return this.http.get(
      `${this.baseUrl}/public/jobs/${id}`
    );
  }
}