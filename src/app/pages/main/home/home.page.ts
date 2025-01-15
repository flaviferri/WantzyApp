import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:true,
  imports: [IonicModule, HeaderComponent, RouterLink]
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
