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
import { ArticleCreateComponent } from './articles/article-create/article-create.component';
import { ArticleDetailsComponent } from './articles/article-details/article-details.component';
import { CommentsComponent } from './articles/article-details/comments/comments.component';
import { MoreArticlesComponent } from './articles/article-details/more-articles/more-articles.component';
import { SurveyComponent } from './articles/article-details/survey/survey.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TagsComponent } from './articles/article-create/tags/tags.component';
import { SurveysComponent } from './articles/article-create/surveys/surveys.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { ListsModule } from './lists/lists.module';
import { AdsComponent } from './ads/ads.component';
import { SearchComponent } from './sidenavs/search/search.component';
import { FilesComponent } from './files/files.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { TextEditorComponent } from './articles/article-create/text-editor/text-editor.component';
import { EditImageComponent } from './articles/article-create/edit-image/edit-image.component'
import { ArticlesModule } from './articles/articles.module';
import { PreviewArticleModule } from './preview-article/preview-article.module';
import { AboutComponent } from './about/about.component';

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
    ArticleCreateComponent,
    ArticleDetailsComponent,
    CommentsComponent,
    MoreArticlesComponent,
    SurveyComponent,
    TagsComponent,
    SurveysComponent,
    WidgetsComponent,
    AdsComponent,
    SearchComponent,
    FilesComponent,
    FileManagerComponent,
    TextEditorComponent,
    EditImageComponent,
    AboutComponent,
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
