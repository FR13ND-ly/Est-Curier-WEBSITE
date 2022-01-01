import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/articles.service';
import { WidgetsService } from 'src/app/widgets/widgets.service';

@Component({
    selector: 'app-category-menu',
    templateUrl: './category-menu.component.html',
    styleUrls: ['./category-menu.component.scss'],
})
export class CategoryMenuComponent implements OnInit {
    constructor(
        private articleService: ArticlesService,
        private widgetService: WidgetsService
    ) {}

    selected: string = 'economic';
    articles: any = [];
    widget: any;
    loading: boolean = true;
    ngOnInit() {
        this.articleService.getCategoryArticles(this.selected).subscribe((articles : any) => this.articles = articles);
        this.widgetService.getWidget(2).subscribe((widget: any) => this.widget = widget);
        this.loading = false;
    }

    resetAnimation() {
        let articles = [...<any>document.querySelectorAll('.left-side-articles a'), document.querySelector('.feature-article'), ...<any>document.querySelectorAll('.small-article')]
        articles.forEach((article : any) => {
            article.style.animation = 'none'
            article.offsetHeight
            article.style.animation = null
        })
    }

    onSelectCategory(category: string) {
        this.selected = category;
        this.articleService.getCategoryArticles(this.selected).subscribe((articles: any) => this.articles = articles);
        this.resetAnimation()
    }
}
