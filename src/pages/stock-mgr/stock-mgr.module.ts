import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockMgrPage } from './stock-mgr';

@NgModule({
  declarations: [
    StockMgrPage,
  ],
  imports: [
    IonicPageModule.forChild(StockMgrPage),
  ],
})
export class StockMgrPageModule {}
