import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone:true,
  imports:[IonicModule]
})
export class ForgotPasswordPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
