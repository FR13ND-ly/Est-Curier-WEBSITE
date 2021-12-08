import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/articles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { ListsService } from 'src/app/lists.service';
import { SearchService } from 'src/app/sidenavs/search/search.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Title } from "@angular/platform-browser";
import { LoadingService } from 'src/app/loading.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {

  constructor(private titleService: Title, private articleService: ArticlesService, private domSanitizer: DomSanitizer, private router : Router, private route: ActivatedRoute, private userService: UserService, private listsService: ListsService, private searchService: SearchService, private loadingService : LoadingService, private _snackBar: MatSnackBar) { }

  url: string = ''
  article: any
  user : any = ''
  viewAdded : boolean = false
  likes: any = {
    count : 0,
    liked : "favorite_border"
  }
  lists: any = []
  addList: boolean = false
  surveys : any
  titles : any = []
  hideTitles: any = false
  loading: boolean = true
  share: boolean = false
  private userSub: Subscription | undefined;
  ngOnInit(): void {
    this.loadingService.setLoading(true)
    this.userSub = this.userService.getUserUpdateListener()
      .subscribe((user: any) => {
        this.user = user
        if (!this.viewAdded && this.article != "Nu am găsit acest articol"){
          this.viewAdded = true
          this.articleService.addView({
            id : this.article.id,
            token : this.user ? this.user.uid : -1
          })
          this.getLikes()
        }
      }) 
    this.route.params.subscribe(async params => {
      this.url = params['url']
      this.article = await this.articleService.getArticle(this.url)
      if (this.article == "Nu am găsit acest articol"){
        this.router.navigate(['/'])
        return
      }
      this.titleService.setTitle(this.article.title);
      this.article.text = this.domSanitizer.bypassSecurityTrustHtml(this.article.text)
      this.loading = false
      this.loadingService.setLoading(false)
      setTimeout(() => {
        document.getElementById('article-text')?.querySelectorAll('h1').forEach(element => {
          this.titles.push({
            "content" : element.innerText,
            "element" : element
          })
        })
      }, 0)
    });
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe()
  }

  async getLikes(){
    this.likes = await this.articleService.getLikes({
      id : this.article.id,
      token : this.user ? this.user.uid : -1
    })
  }

  async onAddLike(){
    if (this.user){
      await this.articleService.addLike({
        id : this.article.id,
        token : this.user.uid
      })
      this.getLikes()
    }
    else {
      let a =this._snackBar.open("Trebuie să te loghezi", "Autentificare", {duration: 3000});
      a.onAction().subscribe((e : any) => this.userService.setOpen(true))
    }
  }

  async onGetLists() {
    this.lists = await this.listsService.getLightLists({
      id : this.article.id,
      token : this.user.uid
    })
  }

  onAddToList(pk: any) {
    this.listsService.addToList({
      pk : pk,
      id : this.article.id
    })
  }

  async onAddList(addListForm : any){
    let data = {
      name : addListForm.form.value.name,
      access : addListForm.form.value.access? true : false,
      user : this.user.uid
    }
    await this.listsService.addList(data)
    addListForm.reset()
    this.addList = false
  }

  onSearchByTag(tag: string){
    this.searchService.searchByTag('#' + tag)
  }

  onDeleteArticle() {
    this.articleService.deleteArticle(this.article.id)
  }

  goToTitle(title: any) {
    title.element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
    title.element.className = ""
    setTimeout(()=> title.element.className = "scroll-to", 0)
  }

  onShare(e : any, link : string) {
    e.preventDefault();
    var windowShare : any = window.open(
      link + location.href,
      'facebook-popup',
      'height=350,width=600'
    );
    if (windowShare.focus) {
      windowShare.focus();
    }
  }

  onViberShare(e : any) {
    
  }
}
