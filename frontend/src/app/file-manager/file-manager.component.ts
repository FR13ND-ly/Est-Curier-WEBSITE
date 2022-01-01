import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileService } from '../file.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {

  constructor(private fileService : FileService, @Inject(MAT_DIALOG_DATA) public data : any, public dialog: MatDialogRef<FileManagerComponent>, private _snackBar: MatSnackBar) { }
  
  files : any = []
  selected : number = -1
  dragging : boolean = false
  loading : boolean = false
  noMoreFiles : boolean = false
  index: number = 1

  ngOnInit() {
    this.getFiles()
  }

  onUpload(e : any, fromDrag: boolean) {
    this.dragging = false
    
    let file = fromDrag? e.dataTransfer.files[0] : e.target.files[0]
    if (file.type.slice(0, 5) != "image") {
      this._snackBar.open("Fișier nevalid", "", {duration: 3000});
      return
    }
    let formData = new FormData()
    formData.append('file', file, file.name)
    this.loading = true
    this.fileService.uploadFile(formData).subscribe(() => {
      this.index = 1
      this.files = []
      this.getFiles()
      this.loading = false
    })
  }

  selectFile(i : number) {
    if (this.selected == i) {
      this.data.id = -1
      this.data.imageCover = ''
      this.selected = -1
    }
    else {
      this.selected = i
      this.data.id = this.files[i].id
      this.data.actualImage = this.files[i].location
    }
  }

  getFiles() {
    this.fileService.getFiles(this.index).subscribe((data : any) => {
      this.files.push(...data.files)
      this.noMoreFiles = data.noMoreFiles
    })
  }

  onGetMoreFiles() {
    this.index++
    this.getFiles()
  }
}
