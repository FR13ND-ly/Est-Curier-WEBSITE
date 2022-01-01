import { AfterViewInit, Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
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
    observer = new IntersectionObserver((articles) => {this.observeArticles(articles)});

    ngOnInit() {
        this.onGetArticleList();
        this.widgetService.getWidget(3).subscribe((widget: any) => this.widget = widget)
        this.widgetService.getWidget(4).subscribe((weeklyImg: any) => this.weeklyImg = weeklyImg)
    }

    ngAfterViewInit() {
        this.articlesRef.changes.subscribe((articles : any) => {
            articles._results.forEach((article: any) => {
                this.observer.observe(article.nativeElement)
            });
        })
    }

    ngOnDestroy() {
        this.observer.disconnect()
    }

    onGetArticleList() {
        this.articleService.getArticleList(this.index).subscribe((data:any)=> {
            this.articleList.push(...data.articles);
            this.noMoreArticles = data.noMoreArticles;
            this.loading = false;
        })
    }   

    onGetMoreArticles() {
        this.index++;
        this.onGetArticleList();
    }

    observeArticles(articles : any) {
        articles.forEach((article : IntersectionObserverEntry) => {
            if (article.isIntersecting){
                if (article.target == this.articlesRef.last.nativeElement && !this.noMoreArticles) {
                    this.onGetMoreArticles()
                }
                article.target.classList.add("show")
                this.observer.unobserve(article.target)
            }
        })
    }
}