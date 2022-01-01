import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { MaterialModule } from '../material.module';
import { RouterModule, Routes } from '@angular/router';
import { AboutRoutingModule } from './about-routing.module';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  }
];

@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    AboutRoutingModule,
    MaterialModule,
    CommonModule
  ]
})

export class AboutModule { }
