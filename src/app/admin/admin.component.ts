import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  public infoUser: any;

  constructor(
    private router: Router,
  ){
    const jwtToken: any = localStorage.getItem('token')
    this.infoUser = jwtDecode(jwtToken);
  }
  exitApp(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
