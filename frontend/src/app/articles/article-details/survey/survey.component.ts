import { Component, OnInit, Input } from '@angular/core';
import { SurveysService } from 'src/app/articles/article-details/survey/surveys.service';
import { UserService } from 'src/app/user.service';

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {
    @Input() id: any = '';

    constructor(
        private surveyService: SurveysService,
        private userService: UserService
    ) {}
    surveys: any;
    user: any;
    selected: any = 0;
    ngOnInit() {
        this.userService
            .getUserUpdateListener()
            .subscribe((user: any) => {
                this.user = user;
                this.surveyService.getSurvey({
                    id: this.id,
                    token: this.user ? this.user.uid : -1,
                }).subscribe((surveys : any) => this.surveys = surveys);
            });
    }

    changeSurvey(direction: any) {
        if (direction) {
            this.selected =
                this.selected == 0 ? this.surveys.length - 1 : --this.selected;
        } else {
            this.selected =
                this.selected == this.surveys.length - 1 ? 0 : ++this.selected;
        }
    }

    onVote(id: any) {
        if (this.user) {
            this.surveyService.vote({ id, token: this.user.uid }).subscribe(() => {
                this.surveyService.getSurvey({
                    id: this.id,
                    token: this.user ? this.user.uid : -1,
                }).subscribe((surveys : any) => this.surveys = surveys);
            });
        }
    }
}
