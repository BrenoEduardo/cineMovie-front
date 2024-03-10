import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MovieModel } from 'src/core/interface/movies.model';
import { ClienteService } from 'src/core/service/cliente/cliente.service';

@Component({
  selector: 'app-movies-client',
  templateUrl: './movies-client.component.html',
  styleUrls: ['./movies-client.component.scss'],
})
export class MoviesClientComponent {
  public movies!: MovieModel[];
  public filterMovies!: MovieModel[];
  public actionMovies!: MovieModel[];
  public avaliationMovies!: MovieModel[];

  public moviesCarrouselPrincipal: MovieModel[] = [];
  public filter: string = '';
  public infoUser: any;
  public loading: boolean = false;

  public imageMovie: string[] = [];
  constructor(private router: Router, private clienteService: ClienteService) {
    const jwtToken: any = localStorage.getItem('token');
    this.infoUser = jwtDecode(jwtToken);
  }
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.clienteService.getMovies().subscribe((res: any) => {
      let moviesAdded = 0;
      const processedMovies: string[] = [];

      const moviesWithCommonActors = this.findMoviesWithCommonActors(
        res.data,
        processedMovies
      );
      this.moviesCarrouselPrincipal.push(...moviesWithCommonActors);
      moviesAdded += moviesWithCommonActors.length;

      if (moviesAdded < 10) {
        const moviesWithCommonDirectors = this.findMoviesWithCommonDirectors(
          res.data,
          processedMovies
        );
        this.moviesCarrouselPrincipal.push(...moviesWithCommonDirectors);
        moviesAdded += moviesWithCommonDirectors.length;
      }

      if (moviesAdded < 10) {
        const moviesWithCommonGenres = this.findMoviesWithCommonGenres(
          res.data,
          processedMovies
        );
        this.moviesCarrouselPrincipal.push(...moviesWithCommonGenres);
        moviesAdded += moviesWithCommonGenres.length;
      }
      this.movies = res.data;
      this.setAOtherCarrosel();
    });
  }
  setAOtherCarrosel() {
    this.actionMovies = this.movies.filter(movie => movie.genres.some((genre: any) => genre.genresName === 'Ação'));
    this.avaliationMovies = this.movies.sort((a,b) => b.ratings - a.ratings);
  }
  findMoviesWithCommonActors(movies: any[], processedMovies: string[]): any[] {
    const result: any[] = [];
    let moviesAdded = 0;

    movies.forEach((movie: any) => {
      if (moviesAdded < 10 && !processedMovies.includes(movie._id)) {
        const moviesWithSameActors: any[] = [movie];

        movies.forEach((otherMovie: any) => {
          if (
            movie._id !== otherMovie._id &&
            !processedMovies.includes(otherMovie._id)
          ) {
            const commonActors = movie.actors.filter((actor1: any) =>
              otherMovie.actors.some(
                (actor2: any) => actor1.actorName === actor2.actorName
              )
            );

            if (commonActors.length > 0) {
              moviesWithSameActors.push(otherMovie);
              processedMovies.push(otherMovie._id);
            }
          }
        });

        if (moviesWithSameActors.length > 1) {
          result.push(...moviesWithSameActors);
          moviesAdded += moviesWithSameActors.length;
        }
      }
    });

    if (moviesAdded > 10) {
      result.splice(10);
    }

    return result;
  }

  findMoviesWithCommonDirectors(
    movies: any[],
    processedMovies: string[]
  ): any[] {
    const result: any[] = [];
    movies.forEach((movie: any) => {
      if (!processedMovies.includes(movie._id)) {
        const moviesWithSameDirectors = movies.filter((otherMovie: any) =>
          movie.directors.some((director1: any) =>
            otherMovie.directors.some(
              (director2: any) =>
                director1.directorName === director2.directorName
            )
          )
        );

        if (moviesWithSameDirectors.length > 1) {
          result.push(...moviesWithSameDirectors);
          moviesWithSameDirectors.forEach((m: any) =>
            processedMovies.push(m._id)
          );
        }
      }
    });
    return result;
  }

  findMoviesWithCommonGenres(movies: any[], processedMovies: string[]): any[] {
    const result: any[] = [];
    movies.forEach((movie: any) => {
      if (!processedMovies.includes(movie._id)) {
        const moviesWithSameGenres = movies.filter((otherMovie: any) =>
          movie.genres.some((genre1: any) =>
            otherMovie.genres.some(
              (genre2: any) => genre1.genresName === genre2.genresName
            )
          )
        );

        if (moviesWithSameGenres.length > 1) {
          result.push(...moviesWithSameGenres);
          moviesWithSameGenres.forEach((m: any) => processedMovies.push(m._id));
        }
      }
    });
    return result;
  }
  onLoadingChange(loading: boolean) {
    this.loading = loading;
  }
  filterChange(filter: string) {
    this.filter = filter;
  }
  onMoviesChange(movie: MovieModel[]) {
    this.filterMovies = movie;
  }
}
