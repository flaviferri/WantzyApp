import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/models/userModel';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone:true,
  imports: [IonicModule, CommonModule, RouterLink, HeaderComponent, HeaderComponent]


})
export class MainPage implements OnInit {

pages=[
  {title:'home',url:'/main/home',icon:'home-outline'},
  {title:'profile',url:'/main/profile',icon:'person-outline'}

]

router = inject (Router);
firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  currentPath: string='';

  ngOnInit() {
    this.router.events.subscribe((event:any)=>{
      if(event?.url) this.currentPath = event.url;
    })
  }
  user(): User{
    return this.utilsSvc.getFromLocalStorage('user')
  }
  singOut(){
    this.firebaseSvc.signOut();
  }


}
