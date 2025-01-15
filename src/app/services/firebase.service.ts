import { AngularFireAuth } from '@angular/fire/compat/auth';
import { inject, Injectable } from '@angular/core';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth';
import { User } from '../models/userModel';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth)



  //============== Authentication ===============


//========= Sigin=============
  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }
}
