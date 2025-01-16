import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/auth']);
          return false;
        }
      }),
      catchError((err) => {
        // Puedes manejar el error y redirigir en caso de un fallo en la verificación
        console.error('Error al verificar el estado de autenticación', err);
        this.router.navigate(['/auth']);
        return of(false); // Previene que se acceda a la ruta protegida
      })
    );
  }
}


/* export class  AuthGuard {

  firebaseService = inject(FirebaseService)
  utilsSvc = inject(UtilsService);

  CanActivate(


  return new Promise(resolve)=>{}
};
 */



