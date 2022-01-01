import { AfterViewInit, Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListsService } from 'src/app/lists/lists.service';
import { UserService } from 'src/app/user.service';
import { first } from 'rxjs/operators';
import { LoadingService } from 'src/app/loading.service';

@Component({
    selector: 'app-list-details',
    templateUrl: './list-details.component.html',
    styleUrls: ['./list-details.component.scss'],
})
export class ListDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
    constructor(
        private listService: ListsService,
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router,
        private loadingService: LoadingService
    ) {}

    @ViewChildren('listItem') listItemsRef: any;
    listInfo: any = {};
    articles: any = [];
    listId: any = '';
    user: any = '';
    loading: boolean = true;
    index = 1;
    noMoreArticles = true;
    observer = new IntersectionObserver((articles) => {this.observeListItems(articles)}, {threshold: .5});
    ngOnInit() {
        this.loadingService.setLoading(true);
        let params: any = this.route.params.subscribe((params : any) => {
            this.listId = params['id'];
            if (this.listId == 'istoric') {
                this.listId = -1;
            } else if (this.listId == 'aprecieri') {
                this.listId = -2;
            }
            this.userService.getUserUpdateListener().subscribe((user : any) => {
                this.user = user
                if (this.listId) {
                    this.onGetList();
                }
            })
        });
    }

    ngAfterViewInit() {
        this.listItemsRef.changes.subscribe((articles : any) => {
            this.listItemsRef = articles.last.nativeElement
            articles._results.forEach((article: any) => {
                this.observer.observe(article.nativeElement)
            });
        })
    }

    ngOnDestroy() {
        this.listItemsRef.unsubscribe()
        this.observer.disconnect()
    }

    onGetList() {
        this.listInfo = this.listService.getListInfo({
            id: this.listId,
            token: this.user.uid,
        }).subscribe((listInfo : any) => {
            this.listInfo = listInfo
            if (this.listId > 0) {
                if (this.listInfo == 'Nu am găsit această listă') {
                    this.router.navigate(['/']);
                    return;
                }
                if (!this.listInfo.own && this.listInfo.public) {
                    this.router.navigate(['/']);
                    return;
                }
            }
            this.listService.getListArticles({
                id: this.listId,
                token: this.user.uid,
                index: this.index,
            }).subscribe((data : any) => {
                this.articles.push(...data.articles);
                this.noMoreArticles = data.noMoreArticles;
                this.loading = false;
                this.loadingService.setLoading(false);
                this.index++;
            });
        })
    }

    onRemoveList() {
        if (confirm('Ești sigur că dorești să ștergi lista?')) {
            this.listService.removeList(this.listId);
            this.router.navigate(['/']);
        }
    }

    onChangeTitle(title: any) {
        this.listService.changeTitle({ id: this.listId, name: title.trim() });
    }

    onChangePublic(publicity: any) {
        this.listInfo.public = !publicity;
        this.listService.changePublic({ id: this.listId, publicity });
    }

    copyLink() {
        navigator.clipboard.writeText(window.location.href);
    }

    observeListItems(listItems : any) {
        listItems.forEach((listItem : IntersectionObserverEntry) => {
            if (listItem.isIntersecting){
                if (listItem.target == this.listItemsRef.last.nativeElement && !this.noMoreArticles) {
                    this.onGetList()
                }
            }
            listItem.target.classList.toggle("show", listItem.isIntersecting)
        })
    }
}
