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

    onSaveChanges(ad: Ad) {
        this.adService.editAd(ad).subscribe(() => {
            ad.edit = false;
            this.onGetAds();
        });   
    }

    onAddAd(ad: NgForm) {
        this.adService.addAd(ad.value).subscribe(() => {
            ad.reset();
            this.onGetAds();
        })
    }

    onGetAds() {
        this.adService.getAds().subscribe((ads : any) => this.ads = ads);
    }

    onRemoveAd(id: number) {
        this.adService.removeAd(id).subscribe(() => this.onGetAds())
    }
}