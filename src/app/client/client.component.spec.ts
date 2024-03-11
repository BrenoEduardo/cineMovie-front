import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Importe RouterTestingModule
import { ClientComponent } from './client.component';
import { MatIconModule } from '@angular/material/icon';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientComponent ],
      imports: [MatIconModule, RouterTestingModule] // Adicione RouterTestingModule aos imports
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
