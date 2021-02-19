import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties = [
    {
      title: "Ma super maison",
      category: "maison",
      sold: true
    },
    {
      title: "Petit appartement",
      category: "Appartement",
      sold: false
    },
    {
      title: "Belle villa",
      category: "maison",
      sold: true
    },
  ]

  propertiesSubject = new Subject<any[]>();
  // Subject est un type d'observable qui met à disposition le .next
  // Il faut voir le subject comme un émetteur il est à la fois un observable et un observer
  // c a d qu'il va observer les donnés de properties et dès qu'il y aura une modifications il va les émettre

  constructor() { }

  emitProperties() {
    this.propertiesSubject.next(this.properties);
    // il émet les données de properties
  }

  getProperties() {}
}
