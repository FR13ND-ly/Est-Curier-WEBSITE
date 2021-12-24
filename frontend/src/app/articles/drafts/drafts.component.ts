import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/articles.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-drafts',
    templateUrl: './drafts.component.html',
    styleUrls: ['./drafts.component.scss'],
})
export class DraftsComponent implements OnInit, OnDestroy {
    constructor(
        private articleService: ArticlesService,
        private userService: UserService,
        private router: Router
    ) {}

    articles: any = [];
    private userSub: Subscription | undefined;
    async ngOnInit() {
        this.userSub = this.userService
            .getUserUpdateListener()
            .subscribe(async (user: any) => {
                if (!user || !user.isStaff) {
                    this.router.navigate(['/']);
                }
                this.articles = await this.articleService.getDrafts();
            });
    }

    ngOnDestroy() {
        this.userSub?.unsubscribe();
    }
}
