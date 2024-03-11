import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminComponent } from './admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importe BrowserAnimationsModule
import { MatListModule } from '@angular/material/list';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZWI4ZjMzMjliZjZhODdmNzRhMWRiZCIsImVtYWlsIjoiY2xpZW50QGNsaWVudC5jb20iLCJuYW1lIjoiY2xpZW50Iiwicm9sZSI6ImNsaWVudCIsImFjdGl2ZSI6dHJ1ZSwiaWF0IjoxNzEwMTIxNTMwLCJleHAiOjE3MTAyMDc5MzB9.fYrh3bQLvf9-5wfVxIJTEmVmVWukIefaYcrpAKWamxM');

    await TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [RouterTestingModule, MatListModule, MatSidenavModule, MatIconModule, MatToolbarModule, BrowserAnimationsModule], // Adicione BrowserAnimationsModule aos imports
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('token');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
