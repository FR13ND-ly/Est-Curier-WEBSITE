import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListsService } from 'src/app/lists/lists.service';
import { UserService } from 'src/app/user.service';
import { first } from 'rxjs/operators'
import { LoadingService } from 'src/app/loading.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit {

  constructor(private listService : ListsService, private route: ActivatedRoute, private userService: UserService, private router: Router, private loadingService : LoadingService) {}
  listInfo : any = {
  }
  articles : any = []
  listId: any = ''
  user : any = ''
  loading : boolean = true
  index = 1
  noMoreArticles = true
  async ngOnInit() {
    this.loadingService.setLoading(true)
    let params: any = await this.route.params.pipe(first()).toPromise()
    this.listId = params['id']
    if (this.listId == "istoric"){
      this.listId = -1
    }
    else if (this.listId == "aprecieri"){
      this.listId = -2
    }
    this.user = await this.userService.getUserUpdateListener().pipe(first()).toPromise()
    if (this.listId){
      this.onGetList()
    }
  }

  async onGetList() {
    this.listInfo = await this.listService.getListInfo({id : this.listId, token : this.user.uid})
    
    if (this.listId > 0){
      if (this.listInfo == "Nu am găsit această listă"){
        this.router.navigate(['/'])
        return
      }
      if (!this.listInfo.own && this.listInfo.public){
        this.router.navigate(['/'])
        return
      }
    }
    let data : any = await this.listService.getListArticles({id : this.listId, token : this.user.uid, index : this.index})
    this.articles.push(...data.articles)
    this.noMoreArticles = data.noMoreArticles
    this.loading = false
    this.loadingService.setLoading(false)
    this.index++;
  }

  onRemoveList() {
    if (confirm ("Ești sigur că dorești să ștergi lista?")){
      this.listService.removeList(this.listId)
      this.router.navigate(["/"])
    }
  }

  onChangeTitle(title : any) {
    this.listService.changeTitle({id : this.listId, name: title.trim()})
  }

  onChangePublic(publicity : any) {
    this.listInfo.public = !publicity
    this.listService.changePublic({id : this.listId, publicity})
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href)
  }
}
