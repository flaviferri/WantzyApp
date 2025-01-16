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
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone:true,
  imports: [IonicModule, HeaderComponent, CustomsInputComponent, ReactiveFormsModule, CommonModule, LogoComponent,RouterLink]
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl  (''),
    email : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required]),
    name : new FormControl('',[Validators.required, Validators.minLength(4)])


  })

  firebaseSvc=inject(FirebaseService)
  utilSvc= inject(UtilsService)

  ngOnInit() {

  }

  async submit(){

  if(this.form.valid){

      const loading = await this.utilSvc.loading();
      await loading.present();

    this.firebaseSvc.signUp(this.form.value as User). then(async res=>{
    await this.firebaseSvc.updateUser(this.form.value.name)

    let uid = res.user.uid;
    this.form.controls.uid.setValue(uid);

    this.setUserInfo(uid)


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



  async setUserInfo(uid:string){

    if(this.form.valid){

          const loading = await this.utilSvc.loading();
          await loading.present();

          let path = `users/${uid}`;
          delete this.form.value.password;

    this.firebaseSvc.setDocument(path, this.form.value). then(async res=>{

    this.utilSvc.saveInLocalStorage('user', this.form.value)
    this.utilSvc.routerLink('/main/home')
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
