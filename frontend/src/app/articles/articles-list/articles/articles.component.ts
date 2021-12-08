import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/articles.service';
import { WidgetsService } from 'src/app/widgets.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(private articleService: ArticlesService, private widgetService : WidgetsService) { }

  articleList: any = []
  noMoreArticles: any = false
  index: any = 1
  widget : any = {}
  weeklyImg : any = {}
  loading: boolean = true
  async ngOnInit() {
    this.onGetArticleList()
    this.widget = await this.widgetService.getWidget(3)
    this.weeklyImg = await this.widgetService.getWidget(4)
    this.loading = false
  }

  async onGetArticleList(){
    let data : any = await this.articleService.getArticleList(this.index)
    this.articleList.push(...data.articles)
    this.noMoreArticles = data.noMoreArticles
  }

  onGetMoreArticles() {
    this.index++
    this.onGetArticleList()
  }

}
