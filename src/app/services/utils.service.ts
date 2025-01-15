import { options } from './../../../node_modules/fast-uri/types/index.d';
import { inject, Injectable } from '@angular/core';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

loadingCtrl = inject(LoadingController);
toastCtrl = inject(ToastController);

//========= loading========

loading(){
  return this.loadingCtrl.create({spinner:'bubbles'})
}


//=======Toast=========

async presentToast(opts?: ToastOptions) {
  const toast = await this.toastCtrl.create(opts);
  toast.present();
}

}
