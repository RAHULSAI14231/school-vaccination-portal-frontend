import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public paginationSubject: Subject<any> = new Subject<any>();
  public paginationConfigSubject: Subject<any> = new Subject<any>();
  public refreshStudentListSubject: Subject<any> = new Subject<any>();
  public routeURLSubject: Subject<any> = new Subject<any>();
  constructor() { }

  formatDateToMySQL(dateString: string): string {
    const date = new Date(dateString);
  // Set time if needed (default is 00:00:00)
  date.setHours(16, 0, 0); // Example: 16:00:00

  const tzOffset = -date.getTimezoneOffset(); // in minutes
  const sign = tzOffset >= 0 ? '+' : '-';
  const pad = (n: number) => n.toString().padStart(2, '0');
  const offsetHours = pad(Math.floor(Math.abs(tzOffset) / 60));
  const offsetMinutes = pad(Math.abs(tzOffset) % 60);

  const offsetStr = `${sign}${offsetHours}:${offsetMinutes}`;

  return date.toISOString().slice(0, 19) + offsetStr;
  }
  
}
