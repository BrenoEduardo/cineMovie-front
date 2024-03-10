import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarrosselComponent } from './carrossel/carrossel.component';
import { DetailsMovieComponent } from './details-movie/details-movie.component';
import { RouterOutlet } from '@angular/router';
import { MoviesClientComponent } from './movies-client/movies-client.component';


@NgModule({
  declarations: [ClientComponent, CarrosselComponent, DetailsMovieComponent, MoviesClientComponent],
  imports: [
    CommonModule,
    MatIconModule,
    BrowserAnimationsModule,
    RouterOutlet
  ]
})
export class ClientModule { }
