import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  constructor(private http: HttpClient) { }

  private readonly APIUrl = config.apiUrl

  getWidget(id : any) {
    return this.http.get(`${this.APIUrl}getWidget/${id}/`).toPromise()
  }

  getWidgets() {
    return this.http.get(`${this.APIUrl}getWidgets/`).toPromise()
  }

  async editWidget(data : any) {
    await this.http.post(`${this.APIUrl}editWidget/`, data).toPromise()
  }
}
