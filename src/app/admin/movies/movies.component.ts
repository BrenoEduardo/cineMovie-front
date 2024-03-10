import { Component } from '@angular/core';
import { Subject, debounceTime, switchMap, tap } from 'rxjs';
import { MovieModel } from 'src/core/interface/movies.model';
import { AdminService } from 'src/core/service/admin/admin.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {

  private searchTerms = new Subject<any>();
  public loading : boolean = false
  public movies!: MovieModel[]

  constructor(
    private adminService: AdminService
  ){

  }
  ngOnInit(): void {
    this.getAllMovies()
    this.searchTerms.pipe(
      tap(()=>{
        this.loading = true;
        this.movies = [];
      }),
      debounceTime(1000),
      switchMap((term: any) =>{
        return this.adminService.filterCompanies(term)
      })
    ).subscribe((res: any) => {
      this.loading = false;
      this.movies = res.data;
    });
  }

  getAllMovies(){
    this.adminService.getMovies().subscribe((res: any)=>{
      this.movies = res.data
    })
  }
  openMovies(movie: MovieModel){
    console.log(movie)
  }
}
