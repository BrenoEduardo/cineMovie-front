import { Component } from '@angular/core';
import { RegisterComponent } from '../register-user/register-user.component';
import { UserModel } from 'src/core/interface/user.model';
import { Subject, debounceTime, switchMap, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ClienteService } from 'src/core/service/cliente/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/core/service/admin/admin.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent {
  public infoUser: any;
  public users!: UserModel[];
  public loading: boolean = false;

  constructor(
    private AdminService: AdminService,
    private dialog: MatDialog,
    private router: Router,
    private clienteService: ClienteService
  ) {
    const jwtToken: any = localStorage.getItem('token');
    this.infoUser = jwtDecode(jwtToken);
  }
  ngOnInit(): void {
    this.getAllUsers();
  }
  onLoadingChange(loading: boolean) {
    this.loading = loading;
  }

  onUsersChange(users: UserModel[]) {
    this.users = users;
  }
  getAllUsers() {
    this.AdminService.getUsers(this.infoUser.id).subscribe((res: any) => {
      this.users = res.data;
    });
  }
  openModal(infoUser?: UserModel) {
    this.dialog
      .open(RegisterComponent, {
        width: '600px',
        data: { infoUser },
      })
      .afterClosed()
      .subscribe((res: any) => {
        this.getAllUsers();
      });
  }
}
