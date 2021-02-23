import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Property } from '../interfaces/property';
import firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[] = []

  propertiesSubject = new Subject<Property[]>();
  // Subject est un type d'observable qui met à disposition le .next
  // Il faut voir le subject comme un émetteur il est à la fois un observable et un observer
  // c a d qu'il va observer les donnés de properties et dès qu'il y aura une modification il va les émettre

  constructor() { }

  emitProperties() {
    this.propertiesSubject.next(this.properties);
    // il émet les données de properties
  }

  saveProperties() {
    firebase.database().ref('/properties').set(this.properties);
  }

  getProperties() {
    firebase.database().ref('/properties').on('value', (data) => {
      this.properties = data.val() ? data.val() : [];
      this.emitProperties();
      });
  }


  createProperties(property: Property) {
    this.properties.push(property)
    this.saveProperties();
    this.emitProperties();
  }

  deleteProperty(index) {
    this.properties.splice(index, 1);
    this.saveProperties();
    this.emitProperties();
  }

  updateProperty(property: Property, index) {
    // this.properties[index] = property;
    // this.saveProperties();
    // this.emitProperties();
    //   ------ OR -------
    firebase.database().ref('/properties/' + index).update(property).catch(
      (error) => {
        console.error(error);
      }
    );
  }

}

