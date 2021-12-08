import { Component, OnInit } from '@angular/core';
import { AdsService } from '../ads.service';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {

  constructor(private adService : AdsService, private accountService : UserService) { }
  
  ad = {
    title : '',
    text : '',
    contacts : '',
    apparitions : 1,
  }

  ads : any = []

  user: any = false
  private userSub: Subscription | undefined;

  ngOnInit(): void {
    this.onGetAds()
    this.user = this.accountService.getUser()
    this.userSub = this.accountService.getUserUpdateListener()
      .subscribe((user: any) => {
        this.user = user
      }) 
  }

  async onSaveChanges(ad : any) {
    await this.adService.editAd(ad)
    ad.edit = false
    this.onGetAds()
  }

  async onAddAd(){
    await this.adService.addAd(this.ad)
    this.ad = {
      title : '',
      text : '',
      contacts : '',
      apparitions : 1,
    }
    this.onGetAds()
  }

  async onGetAds() {
    this.ads = await this.adService.getAds()
  }

  async onRemoveAd(id : any) {
    await this.adService.removeAd(id)
    this.onGetAds()    
  }
}
