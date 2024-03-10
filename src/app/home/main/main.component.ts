import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { RegisterComponent } from '../../admin/register-user/register-user.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(
    private dialog: MatDialog
  ) {}
  openModalLogin(){
    this.dialog.open(ModalLoginComponent, {
      width:'600px',
    })
  }
  openModalRegister(){
    this.dialog.open(RegisterComponent, {
      width:'600px',
    })
  }
}
