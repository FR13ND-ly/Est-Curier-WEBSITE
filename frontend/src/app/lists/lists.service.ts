import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';

@Injectable({
    providedIn: 'root',
})
export class ListsService {
    constructor(private http: HttpClient) {}

    readonly APIUrl = config.apiUrl;

    getLightLists(data: any) {
        return this.http.post(this.APIUrl + 'getLightList/', data).toPromise();
    }

    addToList(data: any) {
        return this.http.post(this.APIUrl + 'addToList/', data).toPromise();
    }

    getLists(id: any) {
        return this.http.get(`${this.APIUrl}getFullLists/${id}`).toPromise();
    }

    addList(data: any) {
        return this.http.post(this.APIUrl + 'addList/', data).toPromise();
    }

    getListInfo(data: any) {
        return this.http.post(this.APIUrl + 'getListInfo/', data).toPromise();
    }
    getListArticles(data: any) {
        return this.http
            .post(this.APIUrl + 'getListArticles/', data)
            .toPromise();
    }

    removeList(id: any) {
        return this.http.get(`${this.APIUrl}removeList/${id}`).toPromise();
    }

    changeTitle(data: any) {
        return this.http
            .post(this.APIUrl + 'changeTitleList/', data)
            .toPromise();
    }
    changePublic(data: any) {
        return this.http
            .post(this.APIUrl + 'changePublicList/', data)
            .toPromise();
    }
}
