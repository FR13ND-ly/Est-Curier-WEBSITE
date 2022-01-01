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

  addComment(data : any) {
    this.http.post(this.APIUrl + 'addComment/', data).subscribe(() => this.getComments(data.id))
  }

  removeComment(pk : any, id : any) {
    this.http.delete(`${this.APIUrl}removeComment/${pk}/`).subscribe(() => this.getComments(id))
  }

  getComments(id : any) {
    this.http.get(`${this.APIUrl}getComments/${id}`).subscribe((comments) => {
      this.comments = comments
      this.commentsUpdated.next([...this.comments])
    })
  }

  getCommentsUpdateListener() {
    return this.commentsUpdated.asObservable()
  }
}
