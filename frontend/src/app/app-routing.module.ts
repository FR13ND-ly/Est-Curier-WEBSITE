import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesListComponent } from './articles/articles-list/articles-list.component';
import { ListDetailsComponent } from './lists/list-details/list-details.component';
import { ListsComponent } from './lists/lists/lists.component';

const routes: Routes = [
  {path: '', component: ArticlesListComponent},
  {path: 'creeaza-articol', loadChildren: () => import('./articles/article-create/article-create.module').then(m => m.ArticleCreateModule)},
  {path: 'edita-articol/:url', loadChildren: () => import('./articles/article-create/article-create.module').then(m => m.ArticleCreateModule)},
  {path: 'articol/:url', loadChildren: () => import('./articles/article-details/article-details.module').then(m => m.ArticleDetailsModule)},
  {path: 'widget-uri', loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)},
  {path: 'liste', component: ListsComponent},
  {path: 'lista/:id', component: ListDetailsComponent},
  {path: 'mica-publicitate', loadChildren: () => import('./ads/ads.module').then(m => m.AdsModule)},
  {path: 'fisiere', loadChildren: () => import('./files/files.module').then(m => m.FilesModule)},
  {path: 'ciorne', loadChildren: () => import('./articles/drafts/drafts.module').then(m => m.DraftsModule)},
  {path: 'despre-noi', loadChildren: () => import('./about/about.module').then(m => m.AboutModule)},
  {path: '**', redirectTo: ''}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
