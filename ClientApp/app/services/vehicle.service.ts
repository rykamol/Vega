import { Vehicle, SaveVehicle } from './../Models/Vehicle';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {


  constructor(private http:Http) { }

  getFeatures(){
    return this.http.get('/api/features')
    .map(res=>res.json());
  }
  Create(vehicle:any) {
     return this.http.post('/api/vehicles',vehicle)
     .map(res =>res.json());
  }
  getMakes(){
    return this.http.get('/api/makes')
    .map(res=>res.json());
  }

  getVehicles(id:number){
    return this.http.get('/api/vehicles/' + id)
    .map(res =>res.json());
  }

  update(vehicle:SaveVehicle){
     return this.http.put('/api/vehicles/'+ vehicle.id, vehicle)
     .map(res =>res.json());
  }

}
