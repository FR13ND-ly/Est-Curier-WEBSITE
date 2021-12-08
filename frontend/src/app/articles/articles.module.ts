import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraftsComponent } from './drafts/drafts.component';
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { PreviewArticleModule } from '../preview-article/preview-article.module';

@NgModule({
  declarations: [
    DraftsComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    PreviewArticleModule
  ],
  exports: [
    DraftsComponent,
  ],
})
export class ArticlesModule { }
