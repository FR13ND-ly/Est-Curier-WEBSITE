import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  loading : any = false;
  private loadingUpdated = new Subject<boolean>()

  getOpenUpdateListener() {
    return this.loadingUpdated.asObservable()
  }

  setLoading(state: boolean){
    this.loading = state
    this.loadingUpdated.next(this.loading)
  }
}
