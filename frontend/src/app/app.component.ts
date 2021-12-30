import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { SearchService } from './sidenavs/search/search.service';
import { UserService } from './user.service';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  scroll = 0;
  isDarkTheme: boolean = false
  
  constructor(public overlayContainer: OverlayContainer, private snackBar: MatSnackBar, private scrollDispatcher: ScrollDispatcher, private searchService : SearchService, private userService : UserService, private loadingService : LoadingService, private changeDetectorRef: ChangeDetectorRef){}

  opened: boolean = false
  openedSearch: boolean = false
  keyCodes = [65, 87, 69, 83, 79, 77, 69]
  iteration = 0
  awesomeTitle: boolean = false
  loading: boolean = false
  ngOnInit(){
    this.isDarkTheme = localStorage.getItem('isDarkTheme') == "dark-theme"
    this.onChangeTheme()
    this.scrollDispatcher.scrolled().
        subscribe((cdk: any) => {
          if (cdk.getElementRef().nativeElement.scrollTop > 30) {
            document.getElementById('header')?.setAttribute('class', 'fixed header')
          }
          else {
            document.getElementById('header')?.setAttribute('class', 'unfixed header')
          }
        })
    this.searchService.getSearchSideNavUpdateListener()
        .subscribe((open: boolean) => {
          this.openedSearch = open
        })
    this.userService.getOpenUpdateListener()
        .subscribe((open: boolean) => {
          this.opened = open
        })
    this.loadingService.getOpenUpdateListener()
        .subscribe((loading: boolean) => {
          this.loading = loading
          this.changeDetectorRef.detectChanges();
        })
    
  }

  @HostListener('keydown', ['$event']) onKeyDown(e : any) {
    if (e.keyCode == this.keyCodes[this.iteration]){
      this.iteration++;
      if (this.iteration == 7){
          this.awesomeTitle = true
      }
    }
    else {
        this.iteration = 0
    }
  }
  onOpenAccountNav() {
    this.userService.setOpen(true)
  }

  onOpenSearchNav() {
    this.searchService.openSearchNav()
  }

  onChangeTheme(){
    let theme = this.isDarkTheme ? "dark-theme" : "light-theme"
    document.body.className = "mat-typography " + theme
    localStorage.setItem('isDarkTheme', this.isDarkTheme ? "dark-theme" : "light-theme")
    this.isDarkTheme = !this.isDarkTheme
  }
  
}