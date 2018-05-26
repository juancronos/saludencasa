import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';


import { Producto } from '../../models/producto';

/**
 * Generated class for the EditProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  producto;
  private itemDoc: AngularFirestoreDocument<Producto>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFirestore, public alertCtrl: AlertController) {
    this.producto = navParams.get('producto');
    console.log(this.producto);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
  }

  saveProduct(){
    this.itemDoc = this.db.doc(`Productos/${this.producto.id}`);
    this.itemDoc.update(
      this.producto
    );
    this.alertSuccess()
    this.navCtrl.pop();
  }

  alertSuccess() {
    let alert = this.alertCtrl.create({
      title: 'Producto Editado con exito',
      subTitle: 'El producto ha sido ingresado a la base de datos con exito',
      buttons: ['OK']
    });
    alert.present();
  }
}
