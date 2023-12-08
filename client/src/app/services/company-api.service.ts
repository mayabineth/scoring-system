import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Company } from '../models/Company';

@Injectable({
  providedIn: 'root',
})
export class CompApiService {
  constructor(private http: HttpClient) {}
  private postsUrl: string = 'http://localhost:5000/companies';

  getCompanies(): Observable<any> {
    return this.http.get(this.postsUrl);
  }
  addCompany(comp: Company): Observable<Company> {
    return this.http.post<Company>(this.postsUrl, comp );
  }
  editCompany(comp: Company): Observable<Company> {
    return this.http.patch<Company>(this.postsUrl, comp );
  }
}
