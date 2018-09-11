import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private auth: AngularFireAuth,
              private router: Router,
              private alertService: AlertService) {
                this.user$ = auth.authState;
              }

  async login(email: string, password: string) {
    const user = await this.auth.auth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['account', 'dashboard']);
    return user.user.uid;
  }

  async loginFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    const signIn = await firebase.auth().signInWithPopup(provider);
    console.log(signIn.user);

    return signIn;
    // return await this.auth.auth.signInWithPopup(provider);
  }


  async logout() {
    await this.auth.auth.signOut();
    this.router.navigate(['/']);
  }

  async emailSignUp(email: string, password: string) {
    const user = await this.auth.auth.createUserWithEmailAndPassword(email, password);
    return user.user.uid;
  }
}
