import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/articles.service';
import { LoadingService } from 'src/app/loading.service';
import { WidgetsService } from 'src/app/widgets/widgets.service';

@Component({
    selector: 'app-top',
    templateUrl: './top.component.html',
    styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
    constructor(
        private articleService: ArticlesService,
        private widgetService: WidgetsService,
        private loadingService: LoadingService
    ) {}

    articlesSlider: any = [];

    sideArticles: any = [];
    widget1: any;
    widget2: any;
    selectedIndex = 0;
    interval: any;
    loading: boolean = true;

    ngOnInit() {
        this.loadingService.setLoading(true);
        this.interval = setInterval(() => {
            this.selectedIndex = ++this.selectedIndex % 5;
            this.resetAnimation()
        }, 5000);
        this.articleService.getTopArticles().subscribe((data: any) => {
            this.articlesSlider = data.primary;
            this.sideArticles = data.secondary.slice(
                0,
                2 + Number(!this.widget1?.activated)
            );
        });
        this.widgetService.getWidget(1).subscribe((widget : any) => this.widget1 = widget);
        this.widgetService.getWidget(5).subscribe((widget: any) => this.widget2 = widget);
        this.loading = false;
        this.loadingService.setLoading(false);
    }

    resetAnimation() {
        let slider : any = document.querySelector('.slider')
        slider.style.animation = 'none';
        slider.offsetHeight
        slider.style.animation = null
    }

    refreshInterval() {
        clearInterval(this.interval);
        this.resetAnimation()
        this.interval = setInterval(() => {
            this.selectedIndex =
                this.selectedIndex == 4 ? 0 : ++this.selectedIndex;
                this.resetAnimation()
        }, 5000);
    }
}
