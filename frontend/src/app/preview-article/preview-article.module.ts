import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewArticlePipe } from './preview-article.pipe';

@NgModule({
  declarations: [PreviewArticlePipe],
  imports: [
    CommonModule
  ],
  exports: [
    PreviewArticlePipe
  ]
})
export class PreviewArticleModule { }
