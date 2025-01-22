import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

firebaseSvc = inject(FirebaseService);
utilsSvc = inject(UtilsService);


  canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let user = localStorage.getItem('user');
    return new Promise ((resolve) => {

      this.firebaseSvc.getAuth().onAuthStateChanged((auth) =>{

        if (auth){
          if(user) resolve(true);
        }
        else{
          this.firebaseSvc.signOut()
          resolve(false);
        }
      })
    });

  }
}


/* export class  AuthGuard {

  firebaseService = inject(FirebaseService)
  utilsSvc = inject(UtilsService);

  CanActivate(


  return new Promise(resolve)=>{}
};
 */



