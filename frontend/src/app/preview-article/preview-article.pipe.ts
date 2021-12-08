import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'articlePreview' })
export class PreviewArticlePipe implements PipeTransform {
   transform(text: string, length : any) {
        text = String(text).replace(/<[^>]+>/gm, '')
        text = text.split(" ").length < length ? text.split(" ").slice(0, length).join(" ") : text.split(" ").slice(0, length).join(" ") + '...'
        return  text
   }
}