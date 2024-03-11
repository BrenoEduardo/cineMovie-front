import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesClientComponent } from './movies-client.component';
import { HttpClientModule } from '@angular/common/http';

describe('MoviesClientComponent', () => {
  let component: MoviesClientComponent;
  let fixture: ComponentFixture<MoviesClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesClientComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
