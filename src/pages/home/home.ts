import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Producto } from '../../models/producto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  itemsCollection: AngularFirestoreCollection<Producto>;
  items:Observable<Producto[]>;

  constructor(public navCtrl: NavController, public db: AngularFirestore) {
    this.itemsCollection = db.collection<Producto>('Productos');
    this.items = this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(item => {
        const data = item.payload.doc.data() as Producto;
        const id = item.payload.doc.id;
        return { id, ...data };
      });
    });

    console.log(this.items);
  }

  goToDetail(category: string){
    console.log(category);
    this.navCtrl.push('CategoryDetailPage');
  }

}
