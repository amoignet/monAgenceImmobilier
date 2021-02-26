import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Property } from '../interfaces/property';
import { PropertiesService } from '../services/properties.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  properties: Property[] = [];
  propertiesSubscription: Subscription;

  constructor(
    private propertiesService: PropertiesService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.propertiesSubscription = this.propertiesService.propertiesSubject.subscribe(
      (data: Property[]) => {
        this.properties = data;
      } // Au chargement on s'abonne grâce à propertiesSubscription
    );
    this.propertiesService.getProperties();
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

  onGoToSingleProperty(index) {
    this.router.navigate(['/property/' + index])
  }

  ngOnDestroy() { // Au déchargement on se désabonne
    this.propertiesSubscription.unsubscribe();
  }
}






