import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class noAuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((user) => {
        if (user) {
          // Si el usuario está autenticado, redirige a '/main'
          this.router.navigate(['/main']);
          return false; // Bloquea el acceso a la ruta de 'auth'
        } else {
          // Si no está autenticado, permite el acceso a la ruta de 'auth'
          return true;
        }
      }),
      catchError(() => {
        // Maneja cualquier error que pueda ocurrir
        this.router.navigate(['/auth']);
        return of(false);
      })
    );
  }
}
