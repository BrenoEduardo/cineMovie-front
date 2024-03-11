import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosselComponent } from './carrossel.component';
import { MatIconModule } from '@angular/material/icon';

describe('CarrosselComponent', () => {
  let component: CarrosselComponent;
  let fixture: ComponentFixture<CarrosselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrosselComponent ],
      imports: [MatIconModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrosselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
