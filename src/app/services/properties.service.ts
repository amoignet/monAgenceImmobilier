import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Property } from '../interfaces/property';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[] = [
    {
      title: "Ma super maison",
      category: "Maison",
      surface: '250',
      rooms: '7',
      description: 'Une maison de rêve',
      price: '300 000',
      sold: true
    },
    {
      title: "Petit appartement",
      category: "Appartement",
      surface: '60',
      rooms: '2',
      description: 'Un petit appartement bien situé',
      price: '90 000',
      sold: false
    },
    {
      title: "Belle villa",
      category: "Maison",
      surface: '350',
      rooms: '10',
      description: 'Un bien d\'exception',
      price: '450 000',
      sold: true
    },
  ]

  propertiesSubject = new Subject<Property[]>();
  // Subject est un type d'observable qui met à disposition le .next
  // Il faut voir le subject comme un émetteur il est à la fois un observable et un observer
  // c a d qu'il va observer les donnés de properties et dès qu'il y aura une modification il va les émettre

  constructor() { }

  emitProperties() {
    this.propertiesSubject.next(this.properties);
    // il émet les données de properties
  }

  getProperties() {}


  createProperties(property: Property) {
    this.properties.push(property)
  }

  deleteProperty(index) {
    this.properties.splice(index, 1);
    this.emitProperties();
  }

  updateProperty(property: Property, index) {
    this.properties[index] = property;
    this.emitProperties();
  }

}

