import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/models/userModel';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CustomsInputComponent } from 'src/app/shared/components/customs-input/customs-input.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone:true,
  imports:[IonicModule, HeaderComponent, CustomsInputComponent, ReactiveFormsModule, CommonModule, LogoComponent,RouterLink]
})
export class ForgotPasswordPage implements OnInit {

    form = new FormGroup({
    email : new FormControl('',[Validators.required, Validators.email]),
  })

  firebaseSvc=inject(FirebaseService)
  utilSvc= inject(UtilsService)

  ngOnInit() {

  }

  async submit(){

    if(this.form.valid){

      const loading = await this.utilSvc.loading();
      await loading.present();

    this.firebaseSvc.sendRecoveryEmail(this.form.value.email). then(res=>{

      this.utilSvc.presentToast({
        message: 'Email sent successfully',
        duration: 1500,
        color:'primary',
        position:'middle',
        icon:'mail-outline'

      });

      this.utilSvc.routerLink('/auth')
      this.form.reset();

    }).catch(error => {
      console.log(error);

      this.utilSvc.presentToast({
        message: error.message,
        duration: 2500,
        color:'primary',
        position:'middle',
        icon:'alert-circle'

      })

    }).finally(() => {
      loading.dismiss();

    })
        }
      }



}
