import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private http: HttpClient) { }

  readonly APIUrl ="http://127.0.0.1:8000/api/"

  getAds(){
    return this.http.get(`${this.APIUrl}getAdons/`).toPromise()
  }

  addAd(data: any){
    return this.http.post(`${this.APIUrl}addAdon/`, data).toPromise()
  }

  editAd(data: any){
    return this.http.post(`${this.APIUrl}editAdon/`, data).toPromise()
  }

  removeAd(id: any){
    return this.http.get(`${this.APIUrl}removeAdon/${id}/`).toPromise()
  }
}
