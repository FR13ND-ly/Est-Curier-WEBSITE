import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdsService } from './ads.service';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Ad } from '../models/ad';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-ads',
    templateUrl: './ads.component.html',
    styleUrls: ['./ads.component.scss'],
})
export class AdsComponent implements OnInit, OnDestroy {
    constructor(
        private adService: AdsService,
        private accountService: UserService
    ) {}

    ads: Ad[] | undefined;

    user: any = false;

    private userSub: Subscription | undefined;

    ngOnInit(): void {
        this.onGetAds();
        this.user = this.accountService.getUser();
        this.userSub = this.accountService
            .getUserUpdateListener()
            .subscribe((user: any) => {
                this.user = user;
            });
    }

    ngOnDestroy() {
        this.userSub?.unsubscribe();
    }

    async onSaveChanges(ad: Ad) {
        await this.adService.editAd(ad);
        ad.edit = false;
        this.onGetAds();
    }

    async onAddAd(ad: NgForm) {
        await this.adService.addAd(ad.value);
        ad.reset();
        this.onGetAds();
    }

    async onGetAds() {
        this.ads = <Ad[]>await this.adService.getAds();
    }

    async onRemoveAd(id: number) {
        await this.adService.removeAd(id);
        this.onGetAds();
    }
}
