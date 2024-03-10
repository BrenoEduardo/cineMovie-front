import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { ClientGuard } from 'src/core/guard/client.guard';
import { AdminGuard } from 'src/core/guard/admin.guard';
import { AdminComponent } from './admin/admin.component';
import { MoviesComponent } from './admin/movies/movies.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { ClientComponent } from './client/client.component';
import { AddMovieComponent } from './admin/movies/add-movie/add-movie.component';
import { MoviesClientComponent } from './client/movies-client/movies-client.component';
import { DetailsMovieComponent } from './client/details-movie/details-movie.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: 'list-user', component: ListUserComponent },
      { path: 'list-movie', component: MoviesComponent },
      { path: 'add-movie', component: AddMovieComponent },
    ],
  },
  {
    path: 'admin/movies',
    component: MoviesComponent,
    canActivate: [AuthGuard, AdminGuard],
  },

  {
    path: 'client',
    component: ClientComponent,
    canActivate: [AuthGuard, ClientGuard],
    children: [
      { path: 'movies', component: MoviesClientComponent },
      { path: 'description-movies', component: DetailsMovieComponent },
    ],
  },
  // { path: 'client/companyDetails', component: CompanyDetailsComponent, canActivate:[AuthGuard, ClientGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
