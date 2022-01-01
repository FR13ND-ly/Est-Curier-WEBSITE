import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = config.apiUrl

  addArticle(article: any){
    article.tags = article.tags.toString()
    article.surveys.forEach((survey: any) => {
      survey.answers =  [].concat.apply([], survey.answers)
    });
    article.moreArticles =  [].concat.apply([], article.moreArticles)
    return this.http.post(this.APIUrl + 'createArticle/', article).toPromise()
  }

  editArticle(article: any){
    article.tags = article.tags.toString()
    article.surveys.forEach((survey: any) => {
      survey.answers =  [].concat.apply([], survey.answers)
    });
    article.moreArticles =  [].concat.apply([], article.moreArticles)
    return this.http.post(this.APIUrl + 'editArticle/', article).toPromise()
  }

  getArticle(url: string) {
    return this.http.get(`${this.APIUrl}getArticle/${url}`)
  }

  addView(data: any){
    this.http.post(this.APIUrl + 'addView/', data).subscribe()
  }

  getLikes(data: any) {
    return this.http.post(this.APIUrl + 'getLikes/', data)
  }

  addLike(data: any) {
    return this.http.post(this.APIUrl + 'addLike/', data)
  }

  getArticleList(index: any) {
    return this.http.get(`${this.APIUrl}getArticleList/${index}/`)
  }
  
  getTopArticles() {
    return this.http.get(this.APIUrl + 'getTopArticles/')
  }

  getCategoryArticles(tag: string) {
    return this.http.get(`${this.APIUrl}getCategoryArticles/${tag}/`)
  }

  deleteArticle(id : string) {
    return this.http.get(`${this.APIUrl}deleteArticle/${id}/`)
  }

  getArticleToEdit(id : string) {
    return this.http.get(`${this.APIUrl}getArticleToEdit/${id}/`).toPromise()
  }

  getDrafts() {
    return this.http.get(`${this.APIUrl}getDrafts/`).toPromise()
  }
}
