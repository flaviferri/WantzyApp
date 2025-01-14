import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone:true,
  imports:[IonicModule]
})
export class SignUpPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
