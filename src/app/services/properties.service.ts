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
    // envoie les datas à properties: Property[] = [] à chaques fois qu'il est appelé (createProperties, deleteProperty)
    firebase.database().ref('/properties').set(this.properties);
  }

  getProperties() {
    // .on() détecte chacune des modifications des données puis emitProperties() rafraichit les données à chaques modifications
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
      // pas besoin de this.emitProperties() car .on() dans getProperties() va détecter le changement.
      (error) => {
        console.error(error);
      }
    );
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const uniqueId = Date.now().toString();
        const fileName = uniqueId + file.name;
        const upload = firebase.storage().ref().child('images/properties/' + fileName).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) =>{
            console.error(error);
            reject(error);
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (downloadUrl) => {
                resolve(downloadUrl);
              }
            );
          }
        );
      }
    );
  }

  removeFile(fileLink: string) {
    if(fileLink) {
      const storageRef = firebase.storage().refFromURL(fileLink);
      storageRef.delete().then(
        () => {
          console.log('file deleted');
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      )
    }
  }

}

