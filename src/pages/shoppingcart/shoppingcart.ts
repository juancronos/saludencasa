import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Producto } from '../../models/producto';
import { HomePage } from '../home/home';

/**
 * Generated class for the ShoppingcartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shoppingcart',
  templateUrl: 'shoppingcart.html',
})
export class ShoppingcartPage {
  itemsInCart: Producto[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    storage.get('shoppingCart').then((val) => {
      if (val != null) {
        this.itemsInCart = val;
        console.log(val)
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingcartPage');
  }

  eliminarItem(item: Producto) {
    let index = this.itemsInCart.indexOf(item, 0);
    if (index > -1) {
      this.itemsInCart.splice(index, 1);
    }

    this.storage.set('shoppingCart', this.itemsInCart);
  }

  pagar() {

  }

  cancelar() {
    this.storage.clear();
    this.navCtrl.setRoot(HomePage);
  }

}
