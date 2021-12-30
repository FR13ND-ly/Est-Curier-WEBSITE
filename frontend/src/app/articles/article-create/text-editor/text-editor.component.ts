import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { FileManagerComponent } from 'src/app/file-manager/file-manager.component';
import { EditImageComponent } from '../edit-image/edit-image.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FileService } from 'src/app/file.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  @Input() text: any

  @Output()
  textChange = new EventEmitter<string>();
  
  constructor(private dialog: MatDialog, private domSanitizer: DomSanitizer, private fileService : FileService, private _snackBar: MatSnackBar) { }
  colors = [
    ["Negru" , "#212121"],
    ["Alb" , "#fff"],
    ["Roșu" , "#f44336"],
    ["Roz" , "#e91e63"],
    ["Violet" , "#9c27b0"],
    ["Albastru" , "#2196f3"],
    ["Teal" , "#009688"],
    ["Verde" , "#4caf50"],
    ["Galben" , "#ffeb3b"],
    ["Oranj" , "#ff9800"],
    ["Cafeniu" , "#795548"],
  ]
  formats = [
    ['Citat', 'blockquote'],
    ['Paragraf', 'p'],
    ['Titlu 1', 'h1'],
    ['Titlu 2', 'h2'],
    ['Titlu 3', 'h3'],
    ['Titlu 4', 'h4'],
    ['Titlu 5', 'h5'],
    ['Titlu 6', 'h6'],
    ['Preformatat', 'pre'],
  ]
  fonts = [
    "Arial",
    "Poppins",
    "Impact",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Calibri",
    "Roboto"
  ]
  content : any =''
  code = false
  textEditor : any
  ngOnInit(){
    setTimeout(() => {
      this.textEditor = document.getElementById('text-editor')
      this.content = this.domSanitizer.bypassSecurityTrustHtml(this.text)
    }, 500)
  }

  format(style : any, value : any = '') {
    document.execCommand(style, false, value);
    this.textEditor.focus()
  }

  onChangeCode() {
    this.code = !this.code
    this.content = this.domSanitizer.bypassSecurityTrustHtml(this.text)
  }

  onAddImage() {
    let fileManager = this.dialog.open(FileManagerComponent, {
      autoFocus: true,
      panelClass: 'file-manager',
      data: {
        selected : -1,
        id : '',
        actualImage : ''
      }
    });
    fileManager.afterClosed().subscribe(result => {
      result.actualImage;
      let editImageDialog = this.dialog.open(EditImageComponent, {
        data: {
          actualImage : result.actualImage,
          align : 'left',
          size : '50%',
          legend : ''
        }
      })
      editImageDialog.afterClosed().subscribe(data => {
        this.format("insertHTML", `<img title="${data.legend}" align="${data.align}" style="width: ${data.size}" src="${result.actualImage}"/>`)
      })
    });
  }

  onAddVideo() {
    let video = prompt("Inserează link-ul la video");
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = video!.match(regExp);
    if (match && match[2].length != 11) {
      this._snackBar.open("Link nevalid", "", {duration: 3000});
      return
    }
    let location = video?.search("v=")
    this.textEditor.focus()
    if (video?.trim()) this.format('insertHTML', `<div class="video-container"><iframe src="https://www.youtube.com/embed/${video?.slice(location! + 2, location! + 13)}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`);
  }

  async onAddPdf(e: any) {
    let file = e.target.files[0]
    if (file.type != "application/pdf"){
      this._snackBar.open("Nu a fost încărcat un pdf", "", {duration: 3000});
      return
    }
    let formData = new FormData()
    formData.append('file', file, file.name)
    let pages: any = await this.fileService.uploadPdf(formData)
    pages.forEach((page : string) => {
      this.format("insertHTML", `<img align="center" style="width: 100%" src="${page}"/>`)
    });
  }
}
