import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }

  readonly APIUrl ="http://127.0.0.1:8000/api/"

  getVideos() {
    return this.http.get(`${this.APIUrl}getYTvideos/`).toPromise()
  }

  updateVideos() {
    return this.http.get(`${this.APIUrl}updateYTvideos/`).toPromise()
  }
}
