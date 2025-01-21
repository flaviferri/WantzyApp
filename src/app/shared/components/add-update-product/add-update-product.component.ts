import { Component, inject, OnInit,Input } from '@angular/core';
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
    LogoComponent,
    RouterLink,
  ],
})
export class AddUpdateProductComponent implements OnInit {

  @Input() product : Product;

  form = new FormGroup({
    id: new FormControl(''),
    uid: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    soldUnits: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);

  user = {} as User;

  ngOnInit() {
    this.user = this.utilSvc.getFromLocalStorage('user');
  }

  /*   ======= TAKE / SELECT IMAGE ======
   */

  async takeImage() {
    const dataUrl = (await this.utilSvc.takePicture('Product image')).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }

  async submit() {
    if (this.form.valid) {
      let path = `users/${this.user.uid}/products`;

      const loading = await this.utilSvc.loading();
      await loading.present();

      /*   ======= upload image and get url ======
       */
      let dataUrl = this.form.value.image;
      let imagePath = `${this.user.uid}/${Date.now()}`;
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);

      delete this.form.value.id;

      this.firebaseSvc
        .addDocument(path, this.form.value)
        .then(async (res) => {
          this.utilSvc.dismissModal({ success: true });

          this.utilSvc.presentToast({
            message: 'product created successfully',
            duration: 1500,
            color: 'sucess',
            position: 'middle',
            icon: 'checkmark-circle-outline',
          });
        })
        .catch((error) => {
          console.log(error);

          this.utilSvc.presentToast({
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
}
