import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../models/Test';

@Injectable({
  providedIn: 'root',
})
export class TestApiService {
  constructor(private http: HttpClient) {}
  private testUrl: string = 'http://localhost:5000/tests';

  getTests(): Observable<Test> {
    return this.http.get<Test>(this.testUrl);
  }
  getTest(id: any): Observable<Test> {
    return this.http.get<Test>(`${this.testUrl}/${id}`);
  }
  addTest(test: Test): Observable<Test> {
    return this.http.post<Test>(this.testUrl, test);
  }
}
