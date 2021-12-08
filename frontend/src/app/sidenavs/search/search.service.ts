import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }
  
  readonly APIUrl ="http://127.0.0.1:8000/api/"

  private open: boolean = false

  private searchNavUpdated = new Subject<boolean>()

  searchText: string = ''
  private searchTextUpdated = new Subject<string>()

  articles: any = []
  articlesUpdated = new Subject<any>()

  getSearchSideNavUpdateListener() {
    return this.searchNavUpdated.asObservable()
  }

  getArticlesUpdateListener() {
    return this.articlesUpdated.asObservable()
  }

  getSearchTextUpdateListener() {
    return this.searchTextUpdated.asObservable()
  }

  openSearchNav() {
    this.open = true
    this.searchNavUpdated.next(this.open)
  }

  async search(searchText:string) {
    this.searchText = searchText
    this.articles = await this.http.post(`${this.APIUrl}search/`, { searchText }).toPromise()
    this.articlesUpdated.next(this.articles)
  }

  closeSearchhNav() {
    this.open = false
    this.searchNavUpdated.next(this.open)
    this.changeSearchText('')
    this.articles = []
    this.articlesUpdated.next(this.articles)
  }

  changeSearchText(text : string) {
    this.searchText = text
    this.searchTextUpdated.next(this.searchText)
  }

  searchByTag(tag : any) {
    this.openSearchNav()
    this.changeSearchText(tag)
    this.search(tag)
  }
}
