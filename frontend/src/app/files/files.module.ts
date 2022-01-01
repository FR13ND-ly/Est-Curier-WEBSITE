import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './files.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    FilesComponent
  ],
  imports: [
    FormsModule,
    MaterialModule,
    CommonModule
  ]
})
export class FilesModule { }
