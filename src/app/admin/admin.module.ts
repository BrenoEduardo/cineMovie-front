import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminComponent } from './admin.component';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RegisterComponent } from './register-user/register-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { ListUserComponent } from './list-user/list-user.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';



@NgModule({
  declarations: [AdminComponent, RegisterComponent, MoviesComponent, ListUserComponent, AddMovieComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    RouterOutlet,
    MatProgressSpinnerModule,
    RouterLinkActive,
    RouterModule,
    MatTooltipModule
  ]
})
export class AdminModule { }
