import { AngularFireAuth } from '@angular/fire/compat/auth';
import { inject, Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { User } from '../models/userModel';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  collectionData,
  query
} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
} from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  utilsSvc = inject(UtilsService);
  fireStorage = inject(AngularFirestore);
  storage = inject(AngularFireStorage);

  //===================== Authentication ================================
  getAuth() {
    return getAuth();
  }

  //========= Sigin=============
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //========= Sigup=============
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // ======== upDate user ========

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  //====== Send recover email ==========

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  //====== Sign out ==========

  signOut() {
    getAuth()
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.utilsSvc.routerLink('/auth'); // Redirige a la página de autenticación
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }

  //================== DATABASE =========================

  //====== Get collection data ==========

  getCollectionData(path :string, collectionQuery?: any){
const ref = collection(getFirestore(), path);
return collectionData(query(ref,collectionQuery),{idField:'id'});
  }


  //======SetDocument ==========
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  //======GetDocument ==========

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  //======Add documento ==========

  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  //====================STORAGE ===========================

    //===== upload image ==========


  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(
      () => {
        return getDownloadURL(ref(getStorage(), path));
      }
    );
  }
}
