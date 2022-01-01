import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditImageComponent } from './edit-image/edit-image.component';
import { SurveysComponent } from './surveys/surveys.component';
import { TagsComponent } from './tags/tags.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { ArticleCreateComponent } from './article-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ArticleCreateRoutingModule } from './article-create-routing.module';

@NgModule({
  declarations: [
    EditImageComponent,
    SurveysComponent,
    TagsComponent,
    TextEditorComponent,
    ArticleCreateComponent
  ],
  imports: [
    ArticleCreateRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CommonModule
  ]
})
export class ArticleCreateModule { }
