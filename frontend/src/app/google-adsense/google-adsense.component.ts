import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-google-adsense',
  templateUrl: './google-adsense.component.html',
  styleUrls: ['./google-adsense.component.scss']
})
export class GoogleAdsenseComponent implements AfterViewInit {
  @Input() data : any;
  constructor() { }

  ngAfterViewInit() {
    let window : any = globalThis.window
    setTimeout(() => {
     try {
        (window["adsbygoogle"] = window["adsbygoogle"] || []).push({});
      } catch (e) {
        console.error(e);
      }
    }, 2000);
  }

}
