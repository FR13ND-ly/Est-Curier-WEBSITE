import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(private http: HttpClient) {}
  readonly APIUrl = config.apiUrl

  getSurvey(data: any){
    return this.http.post(this.APIUrl + 'getSurvey/', data).toPromise()
  }

  vote(data: any) {
    return this.http.post(this.APIUrl + 'vote/', data).toPromise()
  }
}
