import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, HeaderComponent, RouterLink],
})
export class HomePage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {}

  //======= Sign out ========

  signOut(){
    this.firebaseSvc.signOut();
  }
}
