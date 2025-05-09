import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isAuthenticated: boolean = false;
    currentUser: any;
  
    tabList = [
      {label: 'Student Management', url: 'student-management', isActive: false},
      {label: 'Drive Management', url: 'drive-management', isActive: false},
      {label: 'Reports', url: 'reports', isActive: false},
    ];
  
    constructor(private authService: AuthService, private router: Router, private utilService: UtilService){}
  
    ngOnInit(){
      console.log(this.isAuthenticated)
      this.isAuthenticated = this.authService.isAuthenticated();
      this.currentUser = this.authService.getUser();
      
      this.utilService.routeURLSubject.subscribe((route: any) => {
        setTimeout(() => {
        let _currentRoute = route;
        this.tabList.forEach((tab) => {
          if(_currentRoute.includes(tab.url))
            tab.isActive = true;
        });
      });
      }
    );
    }
  
    onTabChange(tab: any): void{
      this.tabList.forEach((tab) => {
        tab.isActive = false;
      });
      tab.isActive = true;
      this.router.navigate([tab.url]);
    }
}
