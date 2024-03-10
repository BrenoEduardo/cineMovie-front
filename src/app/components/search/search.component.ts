import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, debounceTime, switchMap, tap } from 'rxjs';
import { MovieModel } from 'src/core/interface/movies.model';
import { UserModel } from 'src/core/interface/user.model';
import { AdminService } from 'src/core/service/admin/admin.service';
import { ClienteService } from 'src/core/service/cliente/cliente.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  private searchTerms = new Subject<any>();
  public loading: boolean = false;
  public users!: UserModel[];
  public movie!: MovieModel[];
  public filterMovie: any = ['name'];

  @Input() infoUser: any;
  @Output() loadingChange = new EventEmitter<boolean>();
  @Output() usersChange = new EventEmitter<UserModel[]>();
  @Output() MoviesChange = new EventEmitter<MovieModel[]>();
  @Output() filterChange = new EventEmitter<string>();

  constructor(
    private AdminService: AdminService,
    private clienteService: ClienteService
  ) {}
  ngOnInit(): void {
    this.searchTerms
      .pipe(
        tap(() => {
          this.loading = true;
          this.loadingChange.emit(this.loading);
          if (this.infoUser.role == 'admin') {
            this.users = [];
            this.usersChange.emit(this.users);
          } else {
            this.movie = [];
            this.MoviesChange.emit(this.movie);
          }
        }),
        debounceTime(1000),
        switchMap((term: any) => {
          if (this.infoUser.role == 'admin') {
            return this.AdminService.filterCompanies(term);
          } else {
            return this.clienteService.filterMovies(term);
          }
        })
      )
      .subscribe((res: any) => {
        this.loading = false;
        this.loadingChange.emit(this.loading);
        if (this.infoUser.role == 'admin') {
          this.users = res.data;
          this.usersChange.emit(this.users);
        } else {
          this.movie = res.data;
          this.MoviesChange.emit(this.movie);
        }
      });
  }
  filter(term?: any) {
    let payload: any = {
      filter: term.target.value,
    };
    this.filterChange.emit(term.target.value);

    if (this.infoUser.role == 'admin') {
      payload = {
        ...payload,
        id: this.infoUser.id,
      };
    } else {
      payload = {
        ...payload,
        typeFilter: this.filterMovie,
      };
    }
    this.searchTerms.next(payload);
  }
  toggleFilters() {
    if (this.infoUser.role !== 'admin') {
      const filtersForm: any = document.querySelector('.filters-form');
      filtersForm.classList.toggle('hidden');
    }
  }
  updateFilters(event: any, filterType: string) {
    if (event.checked) {
      this.filterMovie.push(filterType);
    } else {
      const index = this.filterMovie.indexOf(filterType);
      if (index !== -1) {
        this.filterMovie.splice(index, 1);
      }
    }
  }
}
