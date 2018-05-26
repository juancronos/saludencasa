import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Producto } from '../../models/producto';

/**
 * Generated class for the NewProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-product',
  templateUrl: 'new-product.html',
})
export class NewProductPage {
  itemsCollection: AngularFirestoreCollection<Producto>;
  producto = {} as Producto;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public db: AngularFirestore) {
    this.itemsCollection = db.collection<Producto>('Productos', ref => ref.where('isActive', '==', true));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductPage');
  }

  createProduct(){
    this.itemsCollection.add(this.producto);
    this.alertSuccess();
    this.navCtrl.pop();
  }
  
  alertSuccess() {
    let alert = this.alertCtrl.create({
      title: 'Producto Creado',
      subTitle: 'El producto ha sido ingresado a la base de datos con exito',
      buttons: ['OK']
    });
    alert.present();
  }
}
