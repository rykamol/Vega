import { Observable } from 'rxjs/Observable';
import { VehicleService } from './../../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../../Models/Vehicle';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE=5;
  queryResult:any={};
  makes: any[] = [];
  models: any[] = [];
  filter: any = {
    pageSize:this.PAGE_SIZE
  };
  columns:any[]=[
    {title:'Id'},
    {title:'ContactName', key:'contactName',isSortable:'true'},
    {title:'Make', key:'make',isSortable:'true'},
    {title:'Model', key:'model',isSortable:'true'},
    {}
  ];
   // allVehicles:Vehicle[]=[];

  constructor(private vehicleService: VehicleService, private router: Router) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.populateVehicles();
  }


  private populateVehicles() {
    // this.vehicleService.getVehicles(this.filter)
    //   .subscribe(vehicles => this.vehicles = vehicles);


    var source = [
      this.vehicleService.getMakes(),
      this.vehicleService.getVehicles(this.filter)
    ]

    Observable.forkJoin(source)
      .subscribe(data => {
        this.makes = data[0],
          // this.allVehicles=data[1],
          this.queryResult = data[1]
      }, error => {
        if (error.status = 404) {
          this.router.navigate(['/vehicles'])
        }
      });
  }
  onFilterChange() {
    // var vehicles=this.allVehicles;
    // if(this.filter.makeId)
    //    vehicles=vehicles.filter(v => v.make.id==this.filter.makeId);
    // if(this.filter.modelId)
    // vehicles=vehicles.filter(v => v.model.id==this.filter.modelId);
    // this.vehicles=vehicles;
    this.filter.page=1;
    this.populateVehicles();
  }
  

  resetFilter() {
    this.filter = {
      page:1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
  }

  populateModels() {
    let selectedMake = this.makes.find(m => m.id == this.filter.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  sortBy(columnName:string){
    if(this.filter.sortBy===columnName){
        this.filter.isSortAssending=! this.filter.isSortAssending;
    }else{
      this.filter.sortBy=columnName;
        this.filter.isSortAssending=true;
    }
    this.populateVehicles();
  }

  onPageChanged(page:any){
    this.filter.page=page;
    this.populateVehicles();
  }
}
