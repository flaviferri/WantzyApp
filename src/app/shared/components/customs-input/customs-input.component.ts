import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customs-input',
  templateUrl: './customs-input.component.html',
  styleUrls: ['./customs-input.component.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule,ReactiveFormsModule]
})
export class CustomsInputComponent  implements OnInit {

  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() label!:string;
  @Input() autoComplete!: string;
  @Input() icon!:string;

isPassword!:boolean;
hide:boolean=true;

  constructor() { }

  ngOnInit() {
    if(this.type=='password')this.isPassword=true;
  }

  showOrHidePassword(){
    this.hide= !this.hide;

    if(this.hide)this.type='password';
    else this.type = 'text';
  }

}
