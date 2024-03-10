import { Component } from '@angular/core';
import { Subject, debounceTime, switchMap, tap } from 'rxjs';
import { MovieModel } from 'src/core/interface/movies.model';
import { AdminService } from 'src/core/service/admin/admin.service';
import { ClienteService } from 'src/core/service/cliente/cliente.service';

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
    private adminService: AdminService,
    private clientService: ClienteService
  ){

  }
  ngOnInit(): void {
    this.getAllMovies()
  }

  getAllMovies(){
    this.clientService.getMovies().subscribe((res: any)=>{
      this.movies = res.data
    })
  }
  openMovies(movie: MovieModel){
    console.log(movie)
  }
}
