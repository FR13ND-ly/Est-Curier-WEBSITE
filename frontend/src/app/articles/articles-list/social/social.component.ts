import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeService } from 'src/app/widgets/youtube.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer, private youtubeService : YoutubeService) { }

  selected = -1

  videos : any = []

  selectedVideo : any = ''
  
  loading: boolean = true

  async ngOnInit() {
    this.videos = await this.youtubeService.getVideos()
    this.onSelectVideo(0)
    this.loading = false
  }

  onSelectVideo(index : number) {
    if (index != this.selected) {
      let video = this.videos[index]
      this.selected = index
      this.selectedVideo = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.token}`)
    }
  }

}
