import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {}
  readonly APIUrl = config.apiUrl

  getFiles(index: any){
    return this.http.get(`${this.APIUrl}getFiles/${index}/`)
  }

  removeFile(id: any) {
    return this.http.get(`${this.APIUrl}removeFile/${id}/`)
  }

  uploadFile(file : any) {
    return this.http.post(this.APIUrl + 'uploadFile/', file)
  }
  uploadPdf(file: any) {
    return this.http.post(this.APIUrl + 'uploadPdf/', file).toPromise()
  }
}
