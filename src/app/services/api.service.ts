import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private auth_service_baseURL: string = environment.auth_service; // Replace with your base URL
  private student_service_baseURL: string = environment.student_service; // Replace with your base URL
  private vaccine_service_baseURL: string = environment.vaccine_service; // Replace with your base URL

  constructor(private http: HttpClient) {}

  getApiUrlEndPoint(type: string, url: string): any{
    if(type === 'auth') {
      return `${this.auth_service_baseURL}/${url}`;
    }
    else if(type === 'student') {
      return `${this.student_service_baseURL}/${url}`;
    }
    else if(type === 'vaccine') {
      return `${this.vaccine_service_baseURL}/${url}`;
    }
  }

  get<T>(type: string, endpoint: string, params?: HttpParams): Observable<T> {
    const url = this.getApiUrlEndPoint(type, endpoint);
    return this.http.get<T>(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(type: string, endpoint: string, body: any, options?: { headers?: HttpHeaders, params?: HttpParams }): Observable<T> {
    const url = this.getApiUrlEndPoint(type, endpoint);
    return this.http.post<T>(url, body, options).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(endpoint: string, body: any, type: string): Observable<T> {
    const url = this.getApiUrlEndPoint(type, endpoint);
    return this.http.put<T>(url, body).pipe(
      catchError(this.handleError)
    );
  }

  patch<T>(type: string, endpoint: string, body: any): Observable<T> {
    const url = this.getApiUrlEndPoint(type, endpoint);
    return this.http.patch<T>(url, body).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(type: string, endpoint: string, params?: HttpParams): Observable<T> {
    const url = this.getApiUrlEndPoint(type, endpoint);
    return this.http.delete<T>(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    // You can further enhance this method to handle specific types of errors
    console.error('API call error', error);
    return throwError(error);
  }
}
