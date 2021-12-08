import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss']
})
export class EditImageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any, public dialog: MatDialogRef<EditImageComponent>) { }

  ngOnInit(): void {
  }

}
