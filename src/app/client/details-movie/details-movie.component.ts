import { MovieModel } from './../../../core/interface/movies.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { jwtModel } from 'src/core/interface/jwt.model';
import { ClienteService } from 'src/core/service/cliente/cliente.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.component.html',
  styleUrls: ['./details-movie.component.scss'],
})
export class DetailsMovieComponent implements OnInit {
  movie!: any;
  private userRating!: number;
  protected infoUser!: jwtModel;
  sendAvaliation: boolean = false

  constructor(
    private route: ActivatedRoute,
    private clientService: ClienteService,
    private location: Location
  ) {
    const token: any = localStorage.getItem('token');
    const decoded: jwtModel = jwtDecode(token);
    this.infoUser = decoded;
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const movieParam = params.get('movie');
      if (movieParam) {
        this.movie = JSON.parse(movieParam);
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
  rateMovie(rating: number): void {
    this.userRating = rating;
    const payload = {
      idUser: this.infoUser.id,
      rating: this.userRating,
      infoMovie: this.movie,
    };
    if (this.infoUser.role != 'admin') {
      this.clientService.sendRating(payload).subscribe((res: any) => {
        this.sendAvaliation = true
      });
    }
  }

  isRated(star: number) {
    return this.userRating && star <= this.userRating;
  }
}
