import { Component, inject, OnInit } from '@angular/core';
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
    form = new FormGroup({
    uid: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    soldUnits: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilSvc.loading();
      await loading.present();

      this.firebaseSvc
        .signUp(this.form.value as User)
        .then(async (res) => {
          await this.firebaseSvc.updateUser(this.form.value.name);

          let uid = res.user.uid;
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
