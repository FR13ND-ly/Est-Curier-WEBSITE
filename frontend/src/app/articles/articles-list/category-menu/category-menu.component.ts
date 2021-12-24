import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/articles.service';
import { WidgetsService } from 'src/app/widgets/widgets.service';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {

  constructor(private articleService : ArticlesService, private widgetService: WidgetsService) { }

  selected: string = "economic"
  articles: any = []
  widget: any
  loading: boolean = true
  async ngOnInit() {
    this.articles = await this.articleService.getCategoryArticles(this.selected)
    this.widget = await this.widgetService.getWidget(2)
    this.loading = false
  }

  async onSelectCategory(category: string){
    this.selected = category
    this.articles = await this.articleService.getCategoryArticles(this.selected)
  }
}
