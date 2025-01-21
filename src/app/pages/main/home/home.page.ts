
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

  ngOnInit() {
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user')
  }
  ionViewWillEnter(){
    this.getProduct();
  }

  //=======  Get products ========
getProduct(){
  let path = `users/${this.user().uid}/products`;

 let sub= this.firebaseSvc.getCollectionData(path).subscribe({
    next : (res: any) =>{
      console.log(res)
      this.products = res;
      sub.unsubscribe();
    }
  })

}


    //======= Add or Update products ========
addUpdateProduct(product?:Product){
  this.utilsSvc.presentModal({
    component : AddUpdateProductComponent,
    cssClass: 'add-update-modal',
    componentProps:{ product }
  })
}
}
