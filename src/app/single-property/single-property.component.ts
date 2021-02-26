 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../interfaces/property';
import { PropertiesService } from '../services/properties.service';

@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.scss']
})
export class SinglePropertyComponent implements OnInit {

  property: Property;

  constructor(
    private propertiesService: PropertiesService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.propertiesService.getSingleProperty(id).then(
      (property: Property) =>{
        this.property = property;
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
  }

}
