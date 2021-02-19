import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertiesService } from '../services/properties.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  properties = [];
  propertiesSubscription: Subscription;

  constructor(
    private propertiesService: PropertiesService
    ) { }

  ngOnInit(): void {
    this.propertiesSubscription = this.propertiesService.propertiesSubject.subscribe(
      (data: any) => {
        this.properties = data;
      } // Au chargement on s'abonne grâce à propertiesSubscription
    );
    this.propertiesService.emitProperties();
    // Il faut appeler emitProperties pour qu'il émette les données
  }

  getSoldValue(index) {
    if(this.properties[index].sold) {
      return 'red';
    } else {
      return 'green';
    }
  }

  ngOnDestroy() { // Au déchargement on se désabonne
    this.propertiesSubscription.unsubscribe();
  }
}






