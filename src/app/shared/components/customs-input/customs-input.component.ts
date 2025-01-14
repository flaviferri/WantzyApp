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


  constructor() { }

  ngOnInit() {}

}
