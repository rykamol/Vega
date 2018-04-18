import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {

  Create(vehicle:any) {
     return this.http.post('/api/vehicles',vehicle)
     .map(res =>res.json());
  }
  constructor(private http:Http) { }

  getFeatures(){
    return this.http.get('/api/features')
    .map(res=>res.json());
  }
  
  getMakes(){
    return this.http.get('/api/makes')
    .map(res=>res.json());
  }

}
