import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  constructor(private searchService : SearchService) { }

  focused:boolean = false;

  articles : any = []
  searchText: string = ''
  loading: boolean = false

  private articlesSub: Subscription | undefined;
  
  private searchTextSub: Subscription | undefined;
  ngOnInit() {
    this.searchTextSub = this.searchService.getSearchTextUpdateListener()
      .subscribe(async (text: any) => {
        this.searchText = text
        this.focused = text.trim().length > 0
      })
    this.articlesSub = this.searchService.getArticlesUpdateListener()
      .subscribe(async (articles: any) => {
        this.articles = articles
        this.loading = false
      })
  }

  ngOnDestroy() {
    this.searchTextSub?.unsubscribe()
    this.articlesSub?.unsubscribe()
  }
  
  onCloseSearchNav() {
    this.searchService.closeSearchhNav()
  }

  onSearch(value: string) {
    this.focused = value.trim().length > 0
    if (this.focused) {
      this.loading = true 
      this.searchService.search(value.trim())
    }
    else this.articles = []
  }

}
