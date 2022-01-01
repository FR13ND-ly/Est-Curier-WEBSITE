import { NgModule } from '@angular/core';
import { DraftsComponent } from './drafts.component';
import { MaterialModule } from '../../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { PreviewArticleModule } from '../../preview-article/preview-article.module';
import { DraftsRoutingModule } from './drafts-routing.module';

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
    DraftsRoutingModule,
    DraftsComponent,
  ],
})
export class DraftsModule { }
