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
              private router: Router) {
                this.user$ = auth.authState;
              }

  async login(email: string, password: string) {
    try {
      const user = await this.auth.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['account', 'dashboard']);
      return user.user.uid;
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    return this.auth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  async emailSignUp(email: string, password: string) {
    try {
      const user = await this.auth.auth.createUserWithEmailAndPassword(email, password);
      return user.user.uid;
    } catch (error) {
      console.log(error);
    }
  }
}
