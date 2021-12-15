import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = config.apiUrl

  getStatisticsByDay() {
    return this.http.get(`${this.APIUrl}statisticsByDay/`).toPromise()
  }
}
