import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Producto } from '../../models/producto';

/**
 * Generated class for the CategoryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html',
})
export class CategoryDetailPage {
  titulo: string;
  items:Observable<Producto[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = navParams.get('productos');
    this.titulo = navParams.get('categoria');
  }

  openItem(item: Producto){
    this.navCtrl.push('ProductDetailPage', {producto: item})
    console.log(item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryDetailPage');
  }

}
