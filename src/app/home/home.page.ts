import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

declare var google: any; // avoid google undefined

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: any;
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  infoWindows: any = [];
  markers: any = [
    {
      title: "Boulevard",
      latitude: -23.31139, 
      longitude: -51.14710
    },
    {
      title: "Santa Casa",
      latitude: -23.31611,
      longitude: -51.15731
    },
    {
      title: "Camelodromo",
      latitude: -23.30930,
      longitude: -51.15624
    }
  ];

  public nome: any;

  ionViewDidEnter() {
    this.showMap();
  }

  constructor() {
    this.nome = 'Maria';
  }

  showAlert() {
    console.log('Cool!');
    this.nome = 'Brasileiro';
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      });
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }
  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content">' +
                              '<h2 id="firstHeading" class="firstHeading">' + marker.title + '</h2>' +
                              '<p>Latitude: ' + marker.latitude + '</p>' +
                              '<p>Longitude: ' + marker.longitude + '</p>' +
                            '</div>';
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });                                
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);    
    });
    this.infoWindows.push(infoWindow);
  }
  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }
  showMap() {
    const location = new google.maps.LatLng(-23.31139, -51.14710);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
  }

}
