import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  readonly APIUrl ="http://127.0.0.1:8000/api/"

  addArticle(article: any){
    article.tags = article.tags.toString()
    article.surveys.forEach((survey: any) => {
      survey.answers =  [].concat.apply([], survey.answers)
    });
    article.moreArticles =  [].concat.apply([], article.moreArticles)
    return this.http.post(this.APIUrl + 'createArticle/', article).toPromise()
  }

  editArticle(article: any, cover: any){
    article.tags = article.tags.toString()
    article.surveys.forEach((survey: any) => {
      survey.answers =  [].concat.apply([], survey.answers)
    });
    article.moreArticles =  [].concat.apply([], article.moreArticles)
    return this.http.post(this.APIUrl + 'editArticle/', article).toPromise()
  }

  getArticle(url: string) {
    return this.http.get(`${this.APIUrl}getArticle/${url}`).toPromise()
  }

  async addView(data: any){
    await this.http.post(this.APIUrl + 'addView/', data).toPromise()
  }

  getLikes(data: any) {
    return this.http.post(this.APIUrl + 'getLikes/', data).toPromise()
  }

  addLike(data: any) {
    return this.http.post(this.APIUrl + 'addLike/', data).toPromise()
  }

  getArticleList(index: any) {
    return this.http.get(`${this.APIUrl}getArticleList/${index}/`).toPromise()
  }
  
  getTopArticles() {
    return this.http.get(this.APIUrl + 'getTopArticles/').toPromise()
  }

  getCategoryArticles(tag: string) {
    return this.http.get(`${this.APIUrl}getCategoryArticles/${tag}/`).toPromise()
  }

  deleteArticle(id : string) {
    return this.http.get(`${this.APIUrl}deleteArticle/${id}/`).toPromise()
  }

  getArticleToEdit(id : string) {
    return this.http.get(`${this.APIUrl}getArticleToEdit/${id}/`).toPromise()
  }

  getDrafts() {
    return this.http.get(`${this.APIUrl}getDrafts/`).toPromise()
  }
}
