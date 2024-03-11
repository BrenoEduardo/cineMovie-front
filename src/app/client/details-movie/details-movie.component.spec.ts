import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DetailsMovieComponent } from './details-movie.component';
import { of } from 'rxjs';

describe('DetailsMovieComponent', () => {
  let component: DetailsMovieComponent;
  let fixture: ComponentFixture<DetailsMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
