import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url = enviroment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(id: any){
    return this.http.get(`${this.url}admin/getAllUsers/${id}`)
  }
  register(infoUser: any){
    return this.http.post(`${this.url}admin/register`,infoUser)
  }
  updateUser(id: any, infoUser: any){
    return this.http.put(`${this.url}admin/updateUser/${id}`,infoUser)
  }
  patchProduct(id: any, active: boolean){
    return this.http.patch(`${this.url}admin/deleteUser/${id}`, {active:active})
  }
  filterCompanies(filter: any){
    return this.http.post(`${this.url}admin/filterUsers`, filter)
  }
  getMovies(){
    return this.http.get(`${this.url}admin/getAllMovies`)
  }
  registerMovie(movie: any){
    return this.http.post(`${this.url}admin/register-movie`, movie)
  }
  imageUpload(image: FormData){
    return this.http.post(`${this.url}admin/image-upload`, image)
  }
  newsAtributtes(atributes: any){
    return this.http.post(`${this.url}admin/newsAtributtes`, atributes)
  }
  getAtributes(){
    return this.http.get(`${this.url}admin/getAtributtes`)
  }
}
