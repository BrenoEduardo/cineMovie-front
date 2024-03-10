import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarrosselComponent } from './carrossel/carrossel.component';
import { DetailsMovieComponent } from './details-movie/details-movie.component';
import { RouterOutlet } from '@angular/router';
import { MoviesClientComponent } from './movies-client/movies-client.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from '../components/components.module';
import { MoviesFilterComponent } from './movies-filter/movies-filter.component';


@NgModule({
  declarations: [ClientComponent, CarrosselComponent, DetailsMovieComponent, MoviesClientComponent, MoviesFilterComponent],
  imports: [
    CommonModule,
    MatIconModule,
    BrowserAnimationsModule,
    RouterOutlet,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ComponentsModule,
  ]
})
export class ClientModule { }
