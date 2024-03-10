import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/core/service/login/login.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss'],
})
export class ModalLoginComponent {
  public loginForm: any;
  public Isregister: boolean = false;
  public submitted: boolean = false;
  public errorLogin: boolean = false;
  public loading: boolean = false;
  public errorActive: boolean = false;
  public messageError!: string;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private dialogRef: MatDialogRef<ModalLoginComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    Object.keys(this.loginForm.controls).forEach((key) => {
      this.loginForm.get(key)?.valueChanges.subscribe(() => {
        if (this.submitted) {
          this.errorLogin = false;
          this.submitted = false;
        }
      });
    });
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  closedModel() {
    this.dialogRef.close();
  }
  register(): void {
    this.Isregister = true;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    this.loading = true;

    this.loginService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.data);
        const decoded: any = jwtDecode(res.data);
        if (!decoded.active){
        this.errorActive = true;
        return;
        }
        decoded.role == 'client'
          ? this.router.navigate(['/client/movies'])
          : this.router.navigate(['/admin/list-user']);
        this.dialogRef.close();
      },
      error: (error: any) => {
        this.messageError = error.error.message
        this.errorLogin = true;
        this.loading = false;
      },
    });
  }
}
