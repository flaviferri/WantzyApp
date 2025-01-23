import { Component, inject, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { CustomsInputComponent } from '../customs-input/customs-input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LogoComponent } from '../logo/logo.component';
import { RouterLink } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/userModel';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    HeaderComponent,
    CustomsInputComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class AddUpdateProductComponent implements OnInit {

  @Input() product: Product;

  form = new FormGroup({
    id: new FormControl(''),
    uid: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    soldUnits: new FormControl(null, [Validators.required, Validators.min(0)]),
  });

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);

  user = {} as User;

  ngOnInit() {
    this.user = this.utilSvc.getFromLocalStorage('user');
    if (this.product) this.form.setValue(this.product);
  }

  /*   ======= TAKE / SELECT IMAGE ====== */
  async takeImage() {
    const dataUrl = (await this.utilSvc.takePicture('Product image')).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }

  submit() {
    if (this.form.valid) {
      if (this.product) this.updateProduct();
      else this.createProduct();
    }
  }

  /*   ============== CHANGE FROM STRING TO NUMBER  ====================================== */
  setNumberInputs() {
    let { soldUnits, price } = this.form.controls;

    if (soldUnits.value) soldUnits.setValue(parseFloat(soldUnits.value));
    if (price.value) price.setValue(parseFloat(price.value));
  }

  /*   ============== CREATE PRODUCT ====================================== */
  async createProduct() {
    const path = `users/${this.user.uid}/products`;

    const loading = await this.utilSvc.loading();
    await loading.present();

    let dataUrl = this.form.value.image;
    let imagePath = `${this.user.uid}/${Date.now()}`;
    let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
    this.form.controls.image.setValue(imageUrl);

    delete this.form.value.id;

    try {
      // Usa addDocument para crear un nuevo producto en la colección
      await this.firebaseSvc.addDocument(path, this.form.value);

      this.utilSvc.dismissModal({ success: true });

      this.utilSvc.presentToast({
        message: 'Product created successfully',
        duration: 1500,
        color: 'success',  // Corregido 'sucess' por 'success'
        position: 'middle',
        icon: 'checkmark-circle-outline',
      });
    } catch (error) {
      console.log(error);

      this.utilSvc.presentToast({
        message: error.message || 'An error occurred while creating the product.',
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle',
      });
    } finally {
      loading.dismiss();
    }
  }

  /*   ============= UPDATE PRODUCT ==================== */
  async updateProduct() {
    const path = `users/${this.user.uid}/products/${this.product.id}`;

    const loading = await this.utilSvc.loading();
    await loading.present();

    if (this.form.value.image !== this.product.image) {
      let dataUrl = this.form.value.image;
      let imagePath = await this.firebaseSvc.getFilePath(this.product.image);
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);
    }

    delete this.form.value.id;

    try {
      await this.firebaseSvc.updateDocument(path, this.form.value);

      this.utilSvc.dismissModal({ success: true });

      this.utilSvc.presentToast({
        message: 'Product updated successfully',
        duration: 1500,
        color: 'success',  // Corregido 'sucess' por 'success'
        position: 'middle',
        icon: 'checkmark-circle-outline',
      });
    } catch (error) {
      console.log(error);

      this.utilSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle',
      });
    } finally {
      loading.dismiss();
    }
  }
}
