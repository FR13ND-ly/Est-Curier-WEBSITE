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
  }

}
