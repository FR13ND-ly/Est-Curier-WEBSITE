import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/articles.service';
import { UserService } from 'src/app/user.service';
import { Subscription } from 'rxjs'
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { FileManagerComponent } from 'src/app/file-manager/file-manager.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from 'src/app/loading.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss']
})

export class ArticleCreateComponent implements OnInit, OnDestroy {

  constructor(private articleService: ArticlesService, private userService : UserService, public sanitizer: DomSanitizer, private router : Router, private route: ActivatedRoute,  private dialog: MatDialog, private _snackBar: MatSnackBar, private loadingService: LoadingService) { }

  user: any = ""

  article : Article = {
    id : 0,
    author : "",
    title: "",
    text : '',
    subtitle : '',
    draft : true,
    cover : new FormData(),
    coverImg : '',
    coverDescription : '',
    disableComments : false,
    hideLikesCount : false,
    hideViewsCount : false,
    hideAuthor : true,
    hideDate : false,
    tags : [],
    moreArticles : [],
    surveys : [],
  }
  coverImage: any = ''
  url:string = ''
  private userSub: Subscription | undefined;
  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.url = params['url']
      if (this.url) {
        this.articleService.getArticleToEdit(this.url).subscribe((article : any) => {
          this.article = article
          this.article.moreArticles
          this.coverImage = this.article.coverImg
        })
      }
    });
    this.userSub = this.userService.getUserUpdateListener()
      .subscribe((user: any) => {
        if (!user || !user.isStaff){
          this.router.navigate(['/'])
        }
        this.user = user
      })
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe()
  }

  onDeleteArticle() {
    this.articleService.deleteArticle(this.article.id)
    this.router.navigate(['/'])
  }

  onAddNewArticle() {
    if (!this.article.title.trim()) {
      this._snackBar.open("Titlul e gol", "", {duration: 3000});
      return
    }
    if (!this.article.text.trim()) {
      this._snackBar.open("Textul e gol", "", {duration: 3000});
      return
    }
    if (!(typeof(this.article.cover) == 'number' || typeof(this.article.cover) == 'string')) {
      this._snackBar.open("Nu este selectată imaginea reprezentativă", "", {duration: 3000});
      return
    }
    if (!this.article.tags.length) {
      this._snackBar.open("Lista tag-urilor e goală", "", {duration: 3000});
      return
    }
    this.loadingService.setLoading(true)
    if (this.url) {
      this.articleService.editArticle(JSON.parse(JSON.stringify(this.article))).subscribe(() => {
        this._snackBar.open("Articolul a fost actualizat", "", {duration: 3000});
      })
    }
    else {
      this.article.author = this.user.uid
      this.articleService.addArticle(JSON.parse(JSON.stringify(this.article))).subscribe((data : any) => {
        this.article.id = data.id
        this.url = data.url
        this._snackBar.open("Articolul a fost adăugat", "", {duration: 3000});
      })
    }
    this.loadingService.setLoading(false)
  }

  onAccesArticle() {
    location.href = `${location.origin}/articol/${this.url}`
  }

  setCoverImg() {
    let fileManager = this.dialog.open(FileManagerComponent, {
      autoFocus: true,
      panelClass: 'file-manager',
      data: {
        selected : -1,
        id : '',
        actualImage : ''
      }
    });
    fileManager.afterClosed().subscribe(result => {
      this.coverImage = result.actualImage;
      this.article.cover = result.id
    });
  }
}
