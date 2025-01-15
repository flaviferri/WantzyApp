import { AngularFireAuth } from '@angular/fire/compat/auth';
import { inject, Injectable } from '@angular/core';
import {createUserWithEmailAndPassword, getAuth,signInWithEmailAndPassword, updateCurrentUser, updateProfile} from 'firebase/auth';
import { User } from '../models/userModel';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {getFirestore, setDoc,doc, getDoc } from '@angular/fire/firestore'


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth)



//===================== Authentication ================================


   //========= Sigin=============
    signIn(user: User){
      return signInWithEmailAndPassword(getAuth(), user.email, user.password)
    }

  //========= Sigup=============
    signUp(user: User){
      return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
    }

   // ======== upDate user ========

  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser,{displayName})
  }

     //================== DATABASE =========================

     //======SetDocument ==========
  setDocument(path:string, data:any){
    return setDoc(doc(getFirestore(),path),data)

  }

       //======GetDocument ==========

  async getDocument(path :string){
    return (await getDoc(doc(getFirestore(),path))).data();
  }


  }
