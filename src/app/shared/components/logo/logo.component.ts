import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  standalone:true,
  imports:[IonicModule]

})
export class LogoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
