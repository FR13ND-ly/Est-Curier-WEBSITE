import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config';

@Injectable({
    providedIn: 'root',
})
export class YoutubeService {
    constructor(private http: HttpClient) {}

    readonly APIUrl = config.apiUrl;

    getVideos() {
        return this.http.get(`${this.APIUrl}getYTvideos/`).toPromise();
    }

    updateVideos() {
        return this.http.get(`${this.APIUrl}updateYTvideos/`).toPromise();
    }
}
