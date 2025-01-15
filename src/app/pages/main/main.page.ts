import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone:true,
  imports: [IonicModule, HeaderComponent, RouterLink]


})
export class MainPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
