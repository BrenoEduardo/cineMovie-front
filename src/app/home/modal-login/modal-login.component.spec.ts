import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'; // Importe MatDialogRef

import { ModalLoginComponent } from './modal-login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

describe('ModalLoginComponent', () => {
  let component: ModalLoginComponent;
  let fixture: ComponentFixture<ModalLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLoginComponent ],
      imports: [HttpClientModule, MatDialogModule, MatIconModule, MatInputModule , ReactiveFormsModule ],
      providers: [
        // Fornecer um mock para MatDialogRef
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
