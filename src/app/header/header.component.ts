import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  dropdownVisible = false;
  openLogOutModal = false;
  user: any;
  avatar = '';
  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void{
    this.getUser();
  }

  getUser(): void{
    this.user = this.authService.getUser();
    this.avatar = this.user?.firstName?.charAt(0).toUpperCase() + this.user?.lastName.charAt(0).toUpperCase();
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  onClick(event: MouseEvent): void {
    const clickedInside = event.target instanceof HTMLElement &&
      (event.target.closest('.avatar') || event.target.closest('.dropdown'));
    if (!clickedInside) {
      this.dropdownVisible = false;
    }
  }

  preventClose(event: MouseEvent): void {
    event.stopPropagation();
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  onLogOut(): void{
    this.authService.removeToken();
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }
}
