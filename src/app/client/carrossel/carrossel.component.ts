import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { MovieModel } from 'src/core/interface/movies.model';

@Component({
  selector: 'app-carrossel',
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.scss'],
})
export class CarrosselComponent implements OnInit, OnDestroy {

  constructor(private router: Router){}

  timerSubs!: Subscription;

  @Input() imagens: MovieModel[] = [];

  private _indexImagemAtiva: number = 0;
  get indexImagemAtiva() {
    return this._indexImagemAtiva;
  }

  set indexImagemAtiva(value: number) {
    this._indexImagemAtiva =
      value < this.imagens.length ? value : 0;
  }

  ngOnInit(): void {
    this.iniciarTimer();
  }

  ngOnDestroy(): void {
    this.pararTimer();
  }

  iniciarTimer(): void {
    this.timerSubs = timer(6000).subscribe(() => {
      this.avancarImagem();
    });
  }

  pararTimer(): void {
    this.timerSubs?.unsubscribe();
  }

  avancarImagem(): void {
    this.ativarImagem(this.indexImagemAtiva + 5);
  }

  retrocederImagem(): void {
    this.ativarImagem(this.indexImagemAtiva - 5);
  }

  ativarImagem(index: number): void {
    if (index >= this.imagens.length) {
      index = 0;
    } else if (index < 0) {
      index = this.imagens.length - 5;
    }
    this.indexImagemAtiva = index;
    this.iniciarTimer();
  }
  descriptionMovie(movie: MovieModel){
    this.router.navigate(['/client/description-movies'], { queryParams: { movie: JSON.stringify(movie) } });
  }
}
