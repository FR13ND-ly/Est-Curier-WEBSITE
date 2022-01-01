import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './files.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FilesRoutingModule } from './files-routing.module';

@NgModule({
  declarations: [
    FilesComponent
  ],
  imports: [
    FormsModule,
    MaterialModule,
    CommonModule,
    FilesRoutingModule
  ]
})
export class FilesModule { }
