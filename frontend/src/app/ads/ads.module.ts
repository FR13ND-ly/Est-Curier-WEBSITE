import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AdsComponent } from './ads.component';
import { AdsRoutingModule } from './ads-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdsComponent
  ],
  imports: [
    FormsModule,
    AdsRoutingModule,
    MaterialModule,
    CommonModule
  ]
})
export class AdsModule { }
