import { Component } from '@angular/core';
import { UtilService } from '../services/util.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { SchoolVaccinationPortalApis } from '../constants/api.constants';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  reports: any;;

  itemsPerPage = 10;
  currentPage = 1;
  offset = 0;

  constructor(
    private utilService: UtilService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.utilService.routeURLSubject.next(this.router.url);
    this.getReportsList();
    this.getPaginationUpdates();
  }

  getPaginationUpdates(): void {
    this.utilService.paginationSubject.subscribe((res: any) => {
      if (res) {
        this.currentPage = res.page;
        this.offset = (res.page - 1) * this.itemsPerPage;
        this.itemsPerPage = res.limit;
        this.getReportsList();
      }
    });
  }
  
  getReportsList(): void{
    this.apiService.get('student', SchoolVaccinationPortalApis.getReports(this.itemsPerPage, this.offset)).subscribe((res: any) => {
      this.reports = res?.data;
      this.utilService.paginationConfigSubject.next({
        totalPages: Math.ceil(res?.total / this.itemsPerPage),
        currentPage: this.currentPage,
      });
    })
  }

  
}
