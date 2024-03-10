import { AdminService } from 'src/core/service/admin/admin.service';
import { Component, Inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/core/service/login/login.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { ModalLoginComponent } from '../../home/modal-login/modal-login.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-register',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterComponent {
  public loginForm: any;
  public productCompany: any;
  public file!: File;
  public submitted: boolean = false;
  public loading: boolean = false;
  public error: boolean = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalLoginComponent>,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data.infoUser) this.patchFormValue();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      role: ['', [Validators.required]],
    });
  }
  patchFormValue(): void {
    this.loginForm.patchValue({
      email: this.data.infoUser.email,
      name: this.data.infoUser.name,
      role: this.data.infoUser.role,
    });
    this.loginForm.get('password').clearValidators();
  }
  closedModel() {
    this.dialogRef.close();
  }
  patchUser(){
    this.adminService.patchProduct(this.data.infoUser._id, this.data.infoUser.active).subscribe((res: any)=>{
      if(res.error){
        console.error(res.error)
      }
      else {
        this.dialogRef.close();
      }
    })
  }

  async onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) return;

    this.loading = true;
    if (this.data.infoUser) {
      this.adminService.updateUser(this.data.infoUser._id, this.loginForm.value).subscribe((res: any)=>{
        this.loginForm.reset();
        this.dialogRef.close();
      })
    } else {
      this.adminService.register(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.loginForm.reset();
          this.dialogRef.close();
        },
        error: (error: any) => {
          this.loading = false;
          this.error = true;
        },
      });
    }
  }
}
