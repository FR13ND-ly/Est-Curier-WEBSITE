import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists/lists.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { MaterialModule } from '../material.module';
import { PreviewArticleModule } from '../preview-article/preview-article.module';

@NgModule({
  declarations: [
    ListsComponent,
    ListDetailsComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    PreviewArticleModule
  ],
  exports: [
    ListsComponent,
    ListDetailsComponent
  ],
})
export class ListsModule { }
