import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/articles.service';
import { LoadingService } from 'src/app/loading.service';
import { WidgetsService } from 'src/app/widgets.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  constructor(private articleService : ArticlesService, private widgetService: WidgetsService, private loadingService: LoadingService) { }

  articlesSlider : any = []

  sideArticles : any = []
  widget1 : any
  widget2 : any
  selectedIndex = 0;
  interval : any
  loading: boolean = true

  async ngOnInit() {
    this.loadingService.setLoading(true)
    this.interval = setInterval(() => {
      this.selectedIndex = this.selectedIndex == 4 ? 0 : ++this.selectedIndex
    }, 5000)
    let data : any = await this.articleService.getTopArticles()
    this.articlesSlider = data.primary
    this.sideArticles = data.secondary
    this.widget1 = await this.widgetService.getWidget(1)
    this.widget2 = await this.widgetService.getWidget(5)
    this.loading = false
    this.loadingService.setLoading(false)
  }

  refreshInterval() {
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.selectedIndex = this.selectedIndex == 4 ? 0 : ++this.selectedIndex
    }, 5000)
  }

}
