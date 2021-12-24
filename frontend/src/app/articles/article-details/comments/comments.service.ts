import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { config } from '../../../config'

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = config.apiUrl
  comments: any = []

  private commentsUpdated = new Subject<any[][]>() 

  async addComment(data : any) {
    await this.http.post(this.APIUrl + 'addComment/', data).toPromise()
    this.getComments(data.id)
  }

  async removeComment(pk : any, id : any) {
    await this.http.delete(`${this.APIUrl}removeComment/${pk}/`).toPromise()
    this.getComments(id)
  }

  async getComments(id : any) {
    this.comments = await this.http.get(`${this.APIUrl}getComments/${id}`).toPromise()
    this.commentsUpdated.next([...this.comments])
  }

  getCommentsUpdateListener() {
    return this.commentsUpdated.asObservable()
  }
}
