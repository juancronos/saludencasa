import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Producto } from '../../models/producto';

/**
 * Generated class for the StockMgrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-mgr',
  templateUrl: 'stock-mgr.html',
})
export class StockMgrPage {
  itemsCollection: AngularFirestoreCollection<Producto>;
  private itemDoc: AngularFirestoreDocument<Producto>;
  items:Observable<Producto[]>;

  constructor(public navCtrl: NavController, public db: AngularFirestore) {
    this.itemsCollection = db.collection<Producto>('Productos', ref => ref.where('isActive', '==', true));
    this.items = this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(item => {
        const data = item.payload.doc.data() as Producto;
        const id = item.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockMgrPage');
  }

  newProduct(){
    this.navCtrl.push('NewProductPage');
  }

  deleteProduct(item){
    console.log(item.id)
    this.itemDoc = this.db.doc(`Productos/${item.id}`);
    this.itemDoc.update(
      {isActive: false}
    );
  }

}
