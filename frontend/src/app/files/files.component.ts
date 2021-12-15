import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit, OnDestroy {

  constructor(private fileService : FileService, private userService : UserService, private router : Router) { }
  files: any = []
  index : number = 1
  noMoreFiles : boolean = false
  loading: boolean = true
  private userSub: Subscription | undefined;
  async ngOnInit() {
    this.userSub = this.userService.getUserUpdateListener()
      .subscribe(async (user: any) => {
        if (!user || !user.isStaff){
          this.router.navigate(['/'])
        }  
        this.getFiles()
      })
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe()
  }

  async getFiles() {
    let data : any = await this.fileService.getFiles(this.index)
    this.files.push(...data.files)
    this.noMoreFiles = data.noMoreFiles
    this.loading = false
  }

  async onRemoveFile(id: number) {
    await this.fileService.removeFile(id)
    this.files = await this.fileService.getFiles(this.index)
  }

  onGetMoreFiles() {
    this.index++
    this.getFiles()
  }
}
