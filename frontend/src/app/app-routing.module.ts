import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdsComponent } from './ads/ads.component';
import { ArticleCreateComponent } from './articles/article-create/article-create.component';
import { ArticleDetailsComponent } from './articles/article-details/article-details.component';
import { ArticlesListComponent } from './articles/articles-list/articles-list.component';
import { DraftsComponent } from './articles/drafts/drafts.component';
import { FilesComponent } from './files/files.component';
import { ListDetailsComponent } from './lists/list-details/list-details.component';
import { ListsComponent } from './lists/lists/lists.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { AboutComponent } from './about/about.component'

const routes: Routes = [
  {path: '', component: ArticlesListComponent},
  {path: 'creeaza-articol', component: ArticleCreateComponent},
  {path: 'edita-articol/:url', component: ArticleCreateComponent},
  {path: 'articol/:url', component: ArticleDetailsComponent},
  {path: 'widget-uri', component: WidgetsComponent},
  {path: 'liste', component: ListsComponent},
  {path: 'lista/:id', component: ListDetailsComponent},
  {path: 'mica-publicitate', component: AdsComponent},
  {path: 'fisiere', component: FilesComponent},
  {path: 'ciorne', component: DraftsComponent},
  {path: 'despre-noi', component: AboutComponent},
  {path: '**', component: ArticlesListComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
