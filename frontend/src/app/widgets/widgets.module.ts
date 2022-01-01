import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsComponent } from './widgets.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { WidgetsRoutingModule } from './widgets-routing.module';

@NgModule({
  declarations: [
    WidgetsComponent
  ],
  imports: [
    WidgetsRoutingModule,
    FormsModule,
    MaterialModule,
    CommonModule
  ]
})
export class WidgetsModule { }
