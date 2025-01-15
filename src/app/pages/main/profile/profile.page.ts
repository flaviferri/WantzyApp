import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone:true,
  imports: [IonicModule, HeaderComponent, RouterLink]
})
export class ProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
