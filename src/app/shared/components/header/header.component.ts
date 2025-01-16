import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule]

})
export class HeaderComponent  implements OnInit {

@Input() title!: string;
@Input() backButton!: string;
@Input() isModal!: boolean;

  utilsSvc = inject(UtilsService);



  ngOnInit() {}

  dismissModal(){
    this.utilsSvc.dismissModal()
  }

}
