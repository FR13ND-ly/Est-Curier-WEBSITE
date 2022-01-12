import { Component, OnInit, Input, OnDestroy, ViewChildren, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentsService } from 'src/app/articles/article-details/comments/comments.service';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, AfterViewInit, OnDestroy {
    
    @Input() info: any = '';
    @ViewChildren('comment') commentsRef: any;

    constructor(private commentsService: CommentsService) {}
    comments: any = [];
    observer: any;
    private commentsSub: Subscription | undefined;
    ngOnInit(): void {
        this.commentsService.getComments(this.info.id);
        this.commentsSub = this.commentsService
            .getCommentsUpdateListener()
            .subscribe((comments: any) => {
                this.comments = comments;
            });
        
    }

    ngAfterViewInit() {
        this.observer = new IntersectionObserver((comments : any) => {
            comments.forEach((comment : IntersectionObserverEntry) => {
                comment.target.classList.toggle("show", comment.isIntersecting)
            })
        }, {threshold: 1});
        this.commentsRef.changes.subscribe((comments : any) => {
            comments._results.forEach((comment: any) => {
                this.observer.observe(comment.nativeElement)
            });
        })
    }

    ngOnDestroy() {
        this.observer.disconnect()
        this.commentsRef.changes.unsubscribe()
        this.commentsSub?.unsubscribe();
    }

    onAddComment(form: any) {
        if (!form.value.text.trim()) return
        this.commentsService.addComment({
            text: form.value.text,
            photoURL: this.info.photoURL,
            author: this.info.token,
            id: this.info.id,
        });
        form.reset();
    }

    removeComment(id: any) {
        let message = confirm("Ești sigur că dorești să ștergi comentariul?")
        if (message){
            this.commentsService.removeComment(id, this.info.id);
        }
    }
}
