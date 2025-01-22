
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/userModel';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { orderBy, where } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, HeaderComponent, RouterLink, CommonModule],
})
export class HomePage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  products: Product[] = [];
  loading: boolean=false;

  ngOnInit() {
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user')
  }
  ionViewWillEnter(){
    this.getProduct();
  }
// Para recargar deslizando desde arriba
  doRefresh(event) {
        setTimeout(() => {
      this.getProduct()
      event.target.complete();
    }, 1000);
  }
  //=======  Get profits ========

  getProfits(){
    return this.products.reduce((index,product)=> index + product.price * product.soldUnits,0)
  }



  //=======  Get products ========
getProduct(){
  let path = `users/${this.user().uid}/products`;

  this.loading=true;

  let query = [
    orderBy('soldUnits', 'desc'),
    //where('soldUnits', '>','20')
  ]
 let sub= this.firebaseSvc.getCollectionData(path).subscribe({
    next : (res: any) =>{
      console.log(res)
      this.products = res;

      this.loading=false;
      sub.unsubscribe();
    }
  })

}


    //======= Add or Update products ========
async addUpdateProduct(product?:Product){
  let success = await this.utilsSvc.presentModal({
    component : AddUpdateProductComponent,
    cssClass: 'add-update-modal',
    componentProps:{ product }
  })

  if(success) this.getProduct();
}


async confirmDeleteProduct(product:Product) {
  this.utilsSvc.presentAlert({
    header: 'Delete Product',
    message: '¿Do you really want to let this product go?',
    mode:'ios',
    buttons: [
      {
        text: 'Cancel',

      }, {
        text: 'yes, delete it',
        handler: () => {
         this.deleteproduct(product);
        }
      }
    ]
  });

}

    //======= DELETE products ========

async deleteproduct(product: Product) {

  let path = `users/${this.user().uid}/products/${product.id}`;

  const loading = await this.utilsSvc.loading();
  await loading.present();

  let imagePath = await this.firebaseSvc.getFilePath(product.image)
  await this.firebaseSvc.deleteFile(imagePath);

  this.firebaseSvc
    .deleteDocument(path)
    .then(async (res) => {

      this.products = this.products.filter(p=> p.id!== product.id);

      this.utilsSvc.presentToast({
        message: 'product deleted successfully',
        duration: 1500,
        color: 'sucess',
        position: 'middle',
        icon: 'checkmark-circle-outline',
      });
    })
    .catch((error) => {
      console.log(error);

      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle',
      });
    })
    .finally(() => {
      loading.dismiss();
    });
}



}
