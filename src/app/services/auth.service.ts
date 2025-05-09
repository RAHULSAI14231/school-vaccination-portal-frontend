import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;
  constructor() { }

  isAuthenticated(): boolean{
    // return !!localStorage.getItem('authToken');
    return !!localStorage.getItem('isAuthenticated');
  }
  
  // Example method to set token (you can replace this with your own logic)
  setToken(token: string): void {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('authToken', token);
  }

  // Example method to remove token (log out logic)
  removeToken(): void {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
  }

  getToken(){
    return localStorage.getItem('authToken');
  }

  setUser(user: any): any{
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any{
    let _user = localStorage.getItem('user');
    if(_user)
    return JSON.parse(_user);
  }
}
