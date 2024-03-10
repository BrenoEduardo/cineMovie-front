import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  public url = enviroment.apiUrl;

  constructor(private http: HttpClient) { }

  getMovies(){
    return this.http.get(`${this.url}client/getAllMovies`)
  }
  sendRating(payload: any){
    return this.http.post(`${this.url}client/avaliation-movies`, payload)
  }
}
