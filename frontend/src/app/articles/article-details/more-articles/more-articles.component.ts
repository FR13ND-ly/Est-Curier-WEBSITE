import { Component, OnInit, Input } from '@angular/core';
import { WidgetsService } from 'src/app/widgets.service';

@Component({
  selector: 'app-more-articles',
  templateUrl: './more-articles.component.html',
  styleUrls: ['./more-articles.component.scss']
})
export class MoreArticlesComponent implements OnInit {
  @Input() articles : any = []
  widget: any
  constructor(private widgetService: WidgetsService) { }
  async ngOnInit() {
    this.widget = await this.widgetService.getWidget(2)
  }

}
