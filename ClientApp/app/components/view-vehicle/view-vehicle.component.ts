import { PhotoService } from './../../services/photo.service';
import { VehicleService } from './../../services/vehicle.service';
import { ToastyService } from 'ng2-toasty';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  
  @ViewChild('fileInput') fileInput:any;
  vehicle: any;
  vehicleId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastyService: ToastyService,
    private photoService:PhotoService,
    private vehicleService: VehicleService) {
    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      console.log(this.vehicleId);
      if (isNaN(this.vehicleId) || this.vehicleId <= 0)
        router.navigate(['/vehicles']);
      return;
    })
  }

  ngOnInit() {
    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status = 404)
            this.router.navigate(['/vehicles']);
          return;
        });
  }
  delete(){
    if(confirm("Are you sure?")){
     this.vehicleService.delete(this.vehicle.id)
     .subscribe(x =>{
       this.router.navigate(['/vehicles']);
     })
    };
  }
  
  uploadPhoto(){
    var nativeElement:any = this.fileInput.nativeElement;
     this.photoService.uploadFile(this.vehicleId, nativeElement.files[0])
     .subscribe(x =>console.log(x));
  }
}
