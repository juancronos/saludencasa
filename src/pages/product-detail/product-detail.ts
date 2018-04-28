import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Producto } from '../../models/producto';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  item: Producto;
  itemsInCart: Object[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {    
    this.item = navParams.get('producto');
    console.log(this.item);    

    storage.get('shoppingCart').then((val) => {
      if(val != null){
        this.itemsInCart = val;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  addToCart(){
    this.item.quantityInCart += 1;
    this.itemsInCart.push(this.item);
    this.storage.set('shoppingCart', this.itemsInCart);
}

}
