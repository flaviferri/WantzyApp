import { name } from './../../../../node_modules/@leichtgewicht/ip-codec/types/index.d';
import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomsInputComponent } from "../../shared/components/customs-input/customs-input.component";
import { CommonModule } from '@angular/common';
import { LogoComponent } from "../../shared/components/logo/logo.component";
import { RouterLink } from '@angular/router';

import { User } from 'src/app/models/userModel';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone:true,
  imports: [IonicModule, HeaderComponent, CustomsInputComponent, ReactiveFormsModule, CommonModule, LogoComponent,RouterLink]
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required])

  })

  firebaseSvc=inject(FirebaseService)
  utilSvc= inject(UtilsService)

  ngOnInit() {

  }

  async submit(){

    if(this.form.valid){

      const loading = await this.utilSvc.loading();
      await loading.present();

    this.firebaseSvc.signIn(this.form.value as User). then(res=>{

    this.getUserInfo(res.user.uid)

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

      async getUserInfo(uid:string){

        if(this.form.valid){

              const loading = await this.utilSvc.loading();
              await loading.present();

              let path = `users/${uid}`;
              delete this.form.value.password;

        this.firebaseSvc.getDocument(path). then((user:User)=>{

        this.utilSvc.saveInLocalStorage('user', user)
        this.utilSvc.routerLink('/main/home')
        this.form.reset();

        this.utilSvc.presentToast({
          message: `Welcome ${user.name}`,
          duration: 1500,
          color:'primary',
          position:'middle',
          icon:'person-circle-outline'

        })


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
