import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties = [
    {
      title: "Ma super maison",
      category: "Maison",
      surface: '75',
      sold: true
    },
    {
      title: "Petit appartement",
      category: "Appartement",
      sold: false
    },
    {
      title: "Belle villa",
      category: "Maison",
      sold: true
    },
  ]

  propertiesSubject = new Subject<any[]>();
  // Subject est un type d'observable qui met à disposition le .next
  // Il faut voir le subject comme un émetteur il est à la fois un observable et un observer
  // c a d qu'il va observer les donnés de properties et dès qu'il y aura une modification il va les émettre

  constructor() { }

  emitProperties() {
    this.propertiesSubject.next(this.properties);
    // il émet les données de properties
  }

  getProperties() {}


  createProperties(property) {
    this.properties.push(property)
  }

  deleteProperty(index) {
    this.properties.splice(index, 1);
    this.emitProperties();
  }

  updateProperty(property, index) {
    this.properties[index] = property;
    this.emitProperties();
  }

}

