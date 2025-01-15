import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomsInputComponent } from "../../shared/components/customs-input/customs-input.component";
import { CommonModule } from '@angular/common';
import { LogoComponent } from "../../shared/components/logo/logo.component";
import { RouterLink } from '@angular/router';

import { User } from 'src/app/models/userModel';


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

/*  firebaseSvc=inject(FirebaseService) */

  ngOnInit() {

  }

  submit(){

/* this.firebaseSvc.signIn(this.form.value as User). then(res=>{
  console.log(res)
}) */
        }


}
