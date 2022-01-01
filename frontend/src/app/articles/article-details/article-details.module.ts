import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CommentsComponent } from './comments/comments.component';
import { MoreArticlesComponent } from './more-articles/more-articles.component';
import { SurveyComponent } from './survey/survey.component';
import { ArticleDetailsComponent } from './article-details.component';
import { ArticleDetailsRoutingModule } from './article-details-routing.module';

@NgModule({
  declarations: [
    CommentsComponent,
    MoreArticlesComponent,
    SurveyComponent,
    ArticleDetailsComponent
  ],
  imports: [
    ArticleDetailsRoutingModule,
    FormsModule,
    MaterialModule,
    CommonModule
  ]
})
export class ArticleDetailsModule { }
