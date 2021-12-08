import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(private http: HttpClient) {}
  readonly APIUrl ="http://127.0.0.1:8000/api/"

  getSurvey(data: any){
    return this.http.post(this.APIUrl + 'getSurvey/', data).toPromise()
  }

  vote(data: any) {
    return this.http.post(this.APIUrl + 'vote/', data).toPromise()
  }
}
