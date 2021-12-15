import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListsService } from 'src/app/lists.service';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/loading.service';
import { Subscription } from 'rxjs';
import { List } from 'src/app/models/list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit, OnDestroy {

  constructor(private listService : ListsService, private userService : UserService, private router : Router, private loadingService : LoadingService) { }
  lists : List[] | undefined
  loading: boolean = true
  private userSub: Subscription | undefined;

  ngOnInit(): void {
    this.loadingService.setLoading(true)
    this.userSub = this.userService.getUserUpdateListener()
      .subscribe(async (user: any) => {
        if (!user){
          this.router.navigate(['/'])
        }
        this.lists = <List[]>await this.listService.getLists(user.uid)
        this.loading = false
        this.loadingService.setLoading(false)
      })
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe()
  }

}
