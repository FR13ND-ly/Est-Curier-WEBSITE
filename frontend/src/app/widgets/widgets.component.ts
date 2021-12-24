import { Component, OnDestroy, OnInit } from '@angular/core';
import { WidgetsService } from './widgets.service';
import { MatDialog } from '@angular/material/dialog';
import { FileManagerComponent } from '../file-manager/file-manager.component';
import { YoutubeService } from './youtube.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../loading.service';
import { Subscription } from 'rxjs';
import { Widget } from '../models/widget';

@Component({
    selector: 'app-widgets',
    templateUrl: './widgets.component.html',
    styleUrls: ['./widgets.component.scss'],
})
export class WidgetsComponent implements OnInit, OnDestroy {
    constructor(
        private widgetService: WidgetsService,
        private dialog: MatDialog,
        private youtubeService: YoutubeService,
        private userService: UserService,
        private router: Router,
        private _snackBar: MatSnackBar,
        private loadingService: LoadingService
    ) {}

    widgets: Widget[] | undefined;

    private widgetsSub: Subscription | undefined;

    async ngOnInit() {
        this.widgetsSub = this.userService
            .getUserUpdateListener()
            .subscribe(async (user: any) => {
                if (!user || !user.isStaff) {
                    this.router.navigate(['/']);
                }
                this.widgets = <Widget[]>await this.widgetService.getWidgets();
            });
    }

    ngOnDestroy() {
        this.widgetsSub?.unsubscribe();
    }

    onEditWidget(widget: Widget) {
        this.loadingService.setLoading(true);
        this.widgetService.editWidget(widget);
        this._snackBar.open('Ai actualizat setările widget-ului', '', {
            duration: 3000,
        });
        this.loadingService.setLoading(false);
    }

    onSetImage(i: number) {
        let fileManager = this.dialog.open(FileManagerComponent, {
            autoFocus: true,
            panelClass: 'file-manager',
            data: {
                selected: -1,
                id: '',
                actualImage: '',
            },
        });
        fileManager.afterClosed().subscribe((result) => {
            this.widgets![i].actualImage = result.actualImage;
            this.widgets![i].image = result.id;
        });
    }

    async onUpdateVideos() {
        this.loadingService.setLoading(true);
        let message: string = <string>await this.youtubeService.updateVideos();
        this._snackBar.open(message, '', { duration: 3000 });
        this.loadingService.setLoading(false);
    }
}
