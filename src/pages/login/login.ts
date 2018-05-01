import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).catch(error => {
        this.loginError();
        console.log(error);
        throw error;
      });;
      if (result) {
        if(user.email == "juand.torres@udea.edu.co"){
          console.log("Es administrador");
          this.navCtrl.setRoot('AdminPage');
        }else{
          this.navCtrl.setRoot(HomePage);
        }        
      }else{
        this.loginError();
      }
    }
    catch (e) {
      console.error(e);
    }
  }
 
  register(){
    this.navCtrl.push('RegisterPage');
  }

  loginError(){
    let alert = this.alertCtrl.create({
          title: 'No se pudo ingresar',
          subTitle: 'Hubo un error, compruebe su correo y contraseña',
          buttons: ['OK']
        });
        alert.present();
  }
}
