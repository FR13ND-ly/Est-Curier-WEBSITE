import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/articles.service';
import { SearchService } from 'src/app/sidenavs/search/search.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor(private searchService: SearchService, private articlesService: ArticlesService) { }

  slides : any = []
  loading : boolean = true

  async ngOnInit() {
    this.slides = await this.articlesService.getCategoryArticles('longread')
    this.slides = this.slides.slice(0, 4)
    this.loading = false
  }

  searchLongReads(){
    this.searchService.searchByTag("#longread")
  }
}
