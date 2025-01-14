import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomsInputComponent } from "../../shared/components/customs-input/customs-input.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone:true,
  imports: [IonicModule, HeaderComponent, CustomsInputComponent,ReactiveFormsModule]
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required])

  })

  constructor() { }

  ngOnInit() {
  }

}
