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
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {

  public infoUser: any;
  public users!: UserModel[]
  private searchTerms = new Subject<any>();
  public loading : boolean = false

  constructor(
    private AdminService: AdminService,
    private dialog: MatDialog,
    private router: Router,
    private clienteService : ClienteService
  ){
    const jwtToken: any = localStorage.getItem('token')
    this.infoUser = jwtDecode(jwtToken);
  }
  ngOnInit(): void {
    this.getAllUsers()
    this.searchTerms.pipe(
      tap(()=>{
        this.loading = true;
        this.users = [];
      }),
      debounceTime(1000),
      switchMap((term: any) =>{
        return this.AdminService.filterCompanies(term)
      })
    ).subscribe((res: any) => {
      this.loading = false;
      this.users = res.data;
    });
  }
  getAllUsers(){
    this.AdminService.getUsers(this.infoUser.id).subscribe((res: any)=>{
      this.users = res.data
    })
  }
  openModal(infoUser?: UserModel){
    this.dialog.open(RegisterComponent, {
      width:'600px',
      data: { infoUser }
    }).afterClosed().subscribe((res: any)=>{
      this.getAllUsers()
    })
  }
  filterCompanies(term:any){
    const payload = {
      'id': this.infoUser.id,
      'filter':term.target.value
    }
    this.searchTerms.next(payload);
  }
}
