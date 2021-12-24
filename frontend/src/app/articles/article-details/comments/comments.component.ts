import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentsService } from 'src/app/articles/article-details/comments/comments.service';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
    @Input() info: any = '';

    constructor(private commentsService: CommentsService) {}
    comments: any = [];

    private commentsSub: Subscription | undefined;
    ngOnInit(): void {
        this.commentsService.getComments(this.info.id);
        this.commentsSub = this.commentsService
            .getCommentsUpdateListener()
            .subscribe((comments: any) => {
                this.comments = comments;
            });
    }
    ngOnDestroy() {
        this.commentsSub?.unsubscribe();
    }

    onAddComment(form: any) {
        this.commentsService.addComment({
            text: form.value.text,
            photoURL: this.info.photoURL,
            author: this.info.token,
            id: this.info.id,
        });
        form.reset();
    }

    removeComment(id: any) {
        this.commentsService.removeComment(id, this.info.id);
    }
}
