import { NgModule } from '@angular/core';
import { ListsComponent } from './lists/lists.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { MaterialModule } from '../material.module';
import { PreviewArticleModule } from '../preview-article/preview-article.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ListsComponent,
    ListDetailsComponent
  ],
  imports: [
    MaterialModule,
    PreviewArticleModule,
    CommonModule
  ],
  exports: [
    ListsComponent,
    ListDetailsComponent
  ],
})
export class ListsModule { }
