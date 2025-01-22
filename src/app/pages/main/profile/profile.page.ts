import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/models/userModel';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone:true,
  imports: [IonicModule, HeaderComponent, RouterLink]
})
export class ProfilePage implements OnInit {

 firebaseSvc = inject(FirebaseService);
    utilSvc = inject(UtilsService);

  ngOnInit() {
  }

   user(): User{
      return this.utilSvc.getFromLocalStorage('user')
    }

      /*   ======= TAKE / SELECT IMAGE ======
   */

  async takeImage() {
    let user = this.user();

    let path = `users/${user.uid}`;


    const dataUrl = (await this.utilSvc.takePicture('Profile image')).dataUrl;
    const loading = await this.utilSvc.loading();
    await loading.present();

    let imagePath = `${user.uid}/profile}`;
    user.image = await this.firebaseSvc.uploadImage(imagePath, dataUrl);

    this.firebaseSvc
    .updateDocument(path, {image: user.image})
    .then(async (res) => {
this.utilSvc.saveInLocalStorage('user',user);
      this.utilSvc.presentToast({
        message: 'image updated successfully',
        duration: 1500,
        color: 'sucess',
        position: 'middle',
        icon: 'checkmark-circle-outline',
      });
    })
    .catch((error) => {
      console.log(error);

      this.utilSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle',
      });
    })
    .finally(() => {
      loading.dismiss();
    });
}

  }


