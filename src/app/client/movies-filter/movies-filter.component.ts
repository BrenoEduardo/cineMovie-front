import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieModel } from 'src/core/interface/movies.model';

@Component({
  selector: 'app-movies-filter',
  templateUrl: './movies-filter.component.html',
  styleUrls: ['./movies-filter.component.scss'],
})
export class MoviesFilterComponent {
  constructor(private router: Router) {}

  @Input() filterMovies!: MovieModel[];

  descriptionMovie(movie: MovieModel) {
    this.router.navigate(['/client/description-movies'], {
      queryParams: { movie: JSON.stringify(movie) },
    });
  }
}
