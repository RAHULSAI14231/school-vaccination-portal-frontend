import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'school-vaccination-portal';

  constructor(private authService: AuthService, private router: Router, private utilService: UtilService){}

  ngOnInit(){  
  }
}
