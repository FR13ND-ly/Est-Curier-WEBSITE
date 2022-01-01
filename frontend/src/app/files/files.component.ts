import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit, OnDestroy {
    constructor(
        private fileService: FileService,
        private userService: UserService,
        private router: Router
    ) { }
    files: any = [];
    index: number = 1;
    noMoreFiles: boolean = false;
    loading: boolean = true;
    private userSub: Subscription | undefined;
    ngOnInit() {
        this.userSub = this.userService
            .getUserUpdateListener()
            .subscribe((user: any) => {
                if (!user || !user.isStaff) {
                    this.router.navigate(['/']);
                }
                this.getFiles();
            });
    }

    ngOnDestroy() {
        this.userSub?.unsubscribe();
    }

    getFiles() {
        this.fileService.getFiles(this.index).subscribe(((data : any) => {
            this.files.push(...data.files);
            this.noMoreFiles = data.noMoreFiles;
            this.loading = false;
        }))
    }

    onRemoveFile(id: number) {
        this.fileService.removeFile(id).subscribe(() => {
            this.index = 1
            this.files = []
            this.getFiles()
        })
    }

    onGetMoreFiles() {
        this.index++;
        this.getFiles();
    }
}
