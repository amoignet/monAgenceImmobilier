import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PropertiesService } from 'src/app/services/properties.service';
import * as $ from 'jquery';
import { Property } from 'src/app/interfaces/property';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.scss']
})
export class AdminPropertiesComponent implements OnInit, OnDestroy {

  propertiesForm: FormGroup;
  propertiesSubscription: Subscription;
  properties: Property[] = [];

  indexToRemove;

  indexToUpdate;
  editMode: boolean = false;

  photoUploading: boolean = false;
  photoUploaded: boolean = false;
  photosAdded: any[]  = [];

  constructor(private formBuilder: FormBuilder, private propertiesService: PropertiesService) { }

  ngOnInit(): void {
    this.initPropertiesForm();
    this.propertiesSubscription = this.propertiesService.propertiesSubject.subscribe(
      (data: Property[]) => {
        this.properties = data;
      }
    );
    this.propertiesService.getProperties();
    this.propertiesService.emitProperties();
  }

  initPropertiesForm() {
    this.propertiesForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      rooms: ['', Validators.required],
      description: '',
      price: ['', Validators.required],
      sold: '',
    })
  }

  onSubmitPropertiesForm() {
    const newProperty: Property = this.propertiesForm.value;
    newProperty.sold = this.propertiesForm.get('sold').value ? this.propertiesForm.get('sold').value : false;
    newProperty.photos = this.photosAdded ? this.photosAdded : [];
    if(this.editMode) {
      this.propertiesService.updateProperty(newProperty, this.indexToUpdate)
    } else {
      this.propertiesService.createProperties(newProperty);
    }
    $('#propertiesFormModal').modal('hide');
  }

  resetForm() {
    this.editMode = false;
    this.propertiesForm.reset();
    this.photosAdded = [];
  }

  onDeleteProperty(index) {
    $('#deletePropertyModal').modal('show');
    this.indexToRemove = index;
  }

  onConfirmDeleteProperty() {
    this.properties[this.indexToRemove].photos.forEach(
      (photo) => {
        this.propertiesService.removeFile(photo);
      }
    )
    this.propertiesService.deleteProperty(this.indexToRemove);
    $('#deletePropertyModal').modal('hide');
  }

  onEditProperty(property: Property) {
    this.editMode = true;
    $('#propertiesFormModal').modal('show');
    this.propertiesForm.get('title').setValue(property.title);
    this.propertiesForm.get('category').setValue(property.category);
    this.propertiesForm.get('surface').setValue(property.surface);
    this.propertiesForm.get('rooms').setValue(property.rooms);
    this.propertiesForm.get('description').setValue(property.description ? property.description : '');
    this.propertiesForm.get('price').setValue(property.price);
    this.propertiesForm.get('sold').setValue(property.sold);
    this.photosAdded = property.photos ? property.photos : [];
    const index = this.properties.findIndex(
      (propertyEl) => {
        if(propertyEl === property) {
          return true
        }
      }
    );
      this.indexToUpdate = index;
  }

  onUploadedFile(event) {
    this.photoUploading = true;
    this.propertiesService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        this.photosAdded.push(url);
        this.photoUploading = false;
        this.photoUploaded = true;
        setTimeout(() => {
          this.photoUploaded = false;
        }, 5000);
      }
    );
  }

  onRemoveAddedPhoto(index) {
    this.propertiesService.removeFile(this.photosAdded[index]);
    this.photosAdded.splice(index, 1);
  }

  ngOnDestroy() {
    this.propertiesSubscription.unsubscribe();
  }
}
