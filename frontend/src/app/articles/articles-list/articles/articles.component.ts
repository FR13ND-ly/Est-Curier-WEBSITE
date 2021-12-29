import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ArticlesService } from 'src/app/articles.service';
import { WidgetsService } from 'src/app/widgets/widgets.service';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit, AfterViewInit, OnDestroy {
    constructor(
        private articleService: ArticlesService,
        private widgetService: WidgetsService
    ) {}

    @ViewChildren('article') articlesRef: any;

    articleList: any = [];
    noMoreArticles: any = false;
    index: any = 1;
    widget: any = {};
    weeklyImg: any = {};
    loading: boolean = true;
    articlesLast: any
    observer = new IntersectionObserver((articles) => {this.observeArticles(articles)});

    async ngOnInit() {
        this.onGetArticleList();
        this.loading = false;
        [this.widget, this.weeklyImg] = await Promise.all([await this.widgetService.getWidget(3),await this.widgetService.getWidget(4)])
    }

    ngAfterViewInit() {
        this.articlesRef.changes.subscribe((articles : any) => {
            this.articlesLast = articles.last.nativeElement
            articles._results.forEach((article: any) => {
                this.observer.observe(article.nativeElement)
            });
        })
    }

    ngOnDestroy() {
        this.observer.disconnect()
    }

    async onGetArticleList() {
        let data: any = await this.articleService.getArticleList(this.index);
        this.articleList.push(...data.articles);
        this.noMoreArticles = data.noMoreArticles;
    }   

    onGetMoreArticles() {
        this.index++;
        this.onGetArticleList();
    }

    observeArticles(articles : any) {
        articles.forEach((article : IntersectionObserverEntry) => {
            if (article.isIntersecting){
                if (article.target == this.articlesLast && !this.noMoreArticles) {
                    this.onGetMoreArticles()
                }
                article.target.classList.add("show")
                this.observer.unobserve(article.target)
            }
        })
    }
}