import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the TrackerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-tracker',
  templateUrl: 'tracker.html',
})
export class TrackerPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;  
  markers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private geolocation: Geolocation) {
    platform.ready().then(() => {
      this.initMap();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackerPage');
  }

  initMap() {
    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
      let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 13,
        center: mylocation
      });
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
      let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
      let location1 = new google.maps.LatLng(6.253625,-75.580078);
      let location2 = new google.maps.LatLng(6.265527,-75.5701646);
      let location3 = new google.maps.LatLng(6.2550657,-75.5864113);
      let location4 = new google.maps.LatLng(6.2449248,-75.5893917);
      this.addMarker(updatelocation);
      this.addMarker(location1);
      this.addMarker(location2);
      this.addMarker(location3);
      this.addMarker(location4);

      this.setMapOnAll(this.map);
    });
  }

  addMarker(location) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map
    });
    this.markers.push(marker);
  }
  
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  
  clearMarkers() {
    this.setMapOnAll(null);
  }
  
  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

}
