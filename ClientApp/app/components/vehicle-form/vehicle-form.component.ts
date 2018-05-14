import * as _ from 'underscore';
import { SaveVehicle, Vehicle } from './../../Models/Vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { empty } from 'rxjs/Observer';
import { ToastyService } from 'ng2-toasty';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  features: any[] = [];
  makes: any[] = [];
  models: any[] = [];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: { 
      name: '',
      email: '', 
      phone: '' 
    }
  };
  user: number = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private toastyService: ToastyService) {
    route.params.subscribe(r => {
      this.vehicle.id = r['id'] || 0;
    })
    console.log(this.vehicle.id);
  }

  ngOnInit() {
    var source = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    if (this.vehicle.id)
      source.push(this.vehicleService.getVehicle(this.vehicle.id));

    Observable.forkJoin(source).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];

      if (this.vehicle.id) {
        this.setVehicle(data[2]);
        this.populateModels();
      }
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/home']);
    });
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered,
    this.vehicle.contact = v.contact,
    this.vehicle.features = _.pluck(v.features, 'id');
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }
  populateModels() {
    let selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId: any, $event: any) {
    if ($event.target.checked)
      this.vehicle.features.push(featureId);

    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    if (this.vehicle.id) {
      this.vehicleService.update(this.vehicle)
        .subscribe(x => {
          this.toastyService.success({
            title: 'Success',
            msg: 'Vehicle successfully updated',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
        });
    } else {
      this.vehicleService.Create(this.vehicle)
      .subscribe(x => {
        this.toastyService.success({
          title: 'Success',
          msg: 'Vehicle create successfully.',
          theme: 'bootstrap',
          showClose: true,
          timeout: 5000
        });
      },error=>{
        if(error.status==400){
          this.toastyService.error({
            title: 'Error',
            msg: 'Unexpected error occur.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
        }
      });
    }
  }
}
