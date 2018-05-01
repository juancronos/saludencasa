import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import firebase from 'firebase';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public fireAuth: any;
  private itemsCollection: AngularFirestoreCollection<User>;
  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.fireAuth = firebase.auth();
    this.itemsCollection = afs.collection<User>('Users');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user: User) {
    try {

      user.password = this.generatePassword();
      console.log(user.password);
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      if (result) {  
        this.resetPassword(user.email);
        user.tipo = "Usuario";
        this.itemsCollection.add(user);   
        let alert = this.alertCtrl.create({
          title: 'Registro Completo',
          subTitle: 'El registro ha sido exitoso, revise su correo',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot('LoginPage');
      }
    } catch (e) {
      console.error(e);
    }
  }

  generatePassword() {
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }
}
