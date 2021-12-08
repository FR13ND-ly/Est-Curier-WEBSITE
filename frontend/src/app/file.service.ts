import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {}
  readonly APIUrl ="http://127.0.0.1:8000/api/"

  getFiles(index: any){
    return this.http.get(`${this.APIUrl}getFiles/${index}/`).toPromise()
  }

  removeFile(id: any) {
    return this.http.get(`${this.APIUrl}removeFile/${id}/`).toPromise()
  }

  uploadFile(file : any) {
    return this.http.post(this.APIUrl + 'uploadFile/', file).toPromise()
  }
  uploadPdf(file: any) {
    return this.http.post(this.APIUrl + 'uploadPdf/', file).toPromise()
  }
}
