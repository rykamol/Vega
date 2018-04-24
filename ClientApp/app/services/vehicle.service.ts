import { Vehicle, SaveVehicle } from './../Models/Vehicle';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {


  private readonly vehicleEndPoint = '/api/vehicles';
  constructor(private http: Http) { }

  getFeatures() {
    return this.http.get('/api/features')
      .map(res => res.json());
  }
  Create(vehicle: any) {
    return this.http.post(this.vehicleEndPoint, vehicle)
      .map(res => res.json());
  }
  getMakes() {
    return this.http.get('/api/makes')
      .map(res => res.json());
  }

  getVehicle(id: number) {
    return this.http.get(this.vehicleEndPoint + '/' + id)
      .map(res => res.json());
  }

  update(vehicle: SaveVehicle) {
    return this.http.put(this.vehicleEndPoint + '/' + vehicle.id, vehicle)
      .map(res => res.json());
  }

  delete(id: number) {
    return this.http.delete(this.vehicleEndPoint + '/' + id)
      .map(res => res.json());
  }

  getVehicles(filter: any) {
    return this.http.get(this.vehicleEndPoint + '?' + this.toQueryString(filter))
      .map(res => res.json());
  }

  toQueryString(obj: any) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }
    return parts.join('&');
  }

}
