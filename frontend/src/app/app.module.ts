import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AccountSideNavComponent } from './sidenavs/account-side-nav/account-side-nav.component';
import { LoginComponent } from './sidenavs/account-side-nav/login/login.component';
import { UserInterfaceComponent } from './sidenavs/account-side-nav/user-interface/user-interface.component';
import { TopComponent } from './articles/articles-list/top/top.component';
import { MaterialModule } from './material.module';
import { ArticlesListComponent } from './articles/articles-list/articles-list.component';
import { CategoryMenuComponent } from './articles/articles-list/category-menu/category-menu.component';
import { SocialComponent } from './articles/articles-list/social/social.component';
import { ArticlesComponent } from './articles/articles-list/articles/articles.component';
import { SliderComponent } from './articles/articles-list/slider/slider.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ListsModule } from './lists/lists.module';
import { SearchComponent } from './sidenavs/search/search.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { ArticlesModule } from './articles/articles.module';
import { PreviewArticleModule } from './preview-article/preview-article.module';

@NgModule({
  declarations: [
    AppComponent,
    AccountSideNavComponent,
    LoginComponent,
    UserInterfaceComponent,
    TopComponent,
    ArticlesListComponent,
    CategoryMenuComponent,
    SocialComponent,
    ArticlesComponent,
    SliderComponent,
    SearchComponent,
    FileManagerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    ArticlesModule,
    EditorModule,
    ReactiveFormsModule,
    ListsModule,
    PreviewArticleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
