import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = "http://127.0.0.1:8000/api/"

  getStatisticsByDay() {
    return this.http.get(`${this.APIUrl}statisticsByDay/`).toPromise()
  }
}
