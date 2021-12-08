import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  readonly APIUrl ="http://127.0.0.1:8000/api/"

  user : any = false
  private userUpdated = new Subject<any[]>() 
  open : any = false;
  private openUpdated = new Subject<boolean>()

  getUser() {
    firebase.auth().onAuthStateChanged(async (user : any)=> {
      if (user) {
        user.isStaff = await this.http.get(`${this.APIUrl}getUserAuthorization/${user.uid}`).toPromise()
      }
      this.userUpdated.next(user)
    })
  }

  getUserUpdateListener() {
    return this.userUpdated.asObservable()
  }

  getOpenUpdateListener() {
    return this.openUpdated.asObservable()
  }

  setOpen(state: boolean){
    this.open = state
    this.openUpdated.next(this.open)
  }

  async facebookLogin(){
    let userData : any = await firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider)
    let data = {
      image : userData.user.photoURL,
      username : userData.user.displayName,
      token : userData.user.uid
    }
    await this.http.post(this.APIUrl + 'login/', data).toPromise()
  }

  async login() {
    let userData : any = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider)
    let data = {
      image : userData.user.photoURL,
      username : userData.user.displayName,
      token : userData.user.uid
    }
    await this.http.post(this.APIUrl + 'login/', data).toPromise()
  }

  logout() {
    firebase.auth().signOut()
    this.user = null
    this.userUpdated.next(this.user)
  }

  getFastInfo() {
    return this.http.get(`${this.APIUrl}getFastInfo/`).toPromise()
  }
}
