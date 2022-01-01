import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent {

  @Input() surveys : any | undefined

  constructor() { }

  selectedIndex = 0 

  onAddNewSurvey() {
    this.surveys.push({
      question: '',
      answers : [[''], ['']]
    })
    this.selectedIndex = this.surveys.length
  }
}
