import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
    selector: 'app-user-interface',
    templateUrl: './user-interface.component.html',
    styleUrls: ['./user-interface.component.scss'],
})
export class UserInterfaceComponent implements OnInit {
    constructor(private userService: UserService) {}

    user: any = false;
    draftsCount: any;
    loading: boolean = true;
    isDarkTheme: boolean = false;
    async ngOnInit() {
        this.isDarkTheme = localStorage.getItem('isDarkTheme') != 'dark-theme';
        this.draftsCount = await this.userService.getFastInfo();
        this.user = this.userService.getUser();
        this.userService.getUserUpdateListener().subscribe((user: any) => {
            this.user = user;
            this.loading = false;
        });
    }

    onLogout() {
        this.userService.logout();
    }
    onCloseAccountNav() {
        this.userService.setOpen(false);
    }

    onChangeTheme() {
        let theme = this.isDarkTheme ? 'dark-theme' : 'light-theme';
        document.body.className = 'mat-typography ' + theme;
        localStorage.setItem(
            'isDarkTheme',
            this.isDarkTheme ? 'dark-theme' : 'light-theme'
        );
        this.isDarkTheme = !this.isDarkTheme;
    }
}
