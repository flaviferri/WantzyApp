import { options } from './../../../node_modules/fast-uri/types/index.d';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

loadingCtrl = inject(LoadingController);
toastCtrl = inject(ToastController);
modalCtrl= inject(ModalController);
router = inject(Router);

//========= loading========

loading(){
  return this.loadingCtrl.create({spinner:'bubbles'})
}


//=======Toast=========

async presentToast(opts?: ToastOptions) {
  const toast = await this.toastCtrl.create(opts);
  toast.present();
}

//=======Enruta a cualquier pagina disponible ========

routerLink(url:string){
  return this.router.navigateByUrl(url);

}

//=======SAVE IN LOCAL STORAGE ========

saveInLocalStorage(key: string, value: object | string){
  return localStorage.setItem(key, JSON.stringify(value))

}

//=======GET FROM LOCAL STORAGE ========

getFromLocalStorage(key:string){
  return JSON.parse(localStorage.getItem(key))
}

//======= MODAL ========

async presentModal(opts: ModalOptions) {
  const modal = await this.modalCtrl.create(opts);
  await modal.present();

  const {data} = await modal.onWillDismiss();
  if(data) return data;

}

dismissModal(data?:any){
  return this.modalCtrl.dismiss(data)
}

}
