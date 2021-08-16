import { Component, OnInit } from '@angular/core';
import { Claim } from '../Model/admin';
import { Customer } from '../Model/adminCust';
import { AdminService } from '../Service/adminService';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  data: any;
  customerCount: any;
  renewCount: any;
  claimCount: any;
  name = sessionStorage.getItem('name');
  allClaims: Claim[] = [] ; // gloal variable available to all other methods + html
  tempClaims: Claim[] =[] ;
  allCustomer: Customer[] = [] ; // gloal variable available to all other methods + html
  tempCustomer: Customer[] =[] ;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadAllClaims();
    // this.loadAllCustomer();

  }

  loadAllClaims() {
    console.log('Load all claim');
    this.adminService.findAllClaimService().subscribe(
      (data: Claim[])=> 
      {
        this.allClaims = data;
      
        this.tempClaims = data;
         //copied into a temp array also
      }, 
      (err) => {
        console.log(err);
      }
    ); // invocation of the subscribe method
  }

  // loadAllCustomer() {
  //   console.log('Load all customer');
  //   this.adminService.findAllCustomerService().subscribe(
  //     (data: Customer[])=> 
  //     {
  //       this.allCustomer = data;
  //       this.tempCustomer = data; //copied into a temp array also
  //     }, 
  //     (err) => {
  //       console.log(err);
  //     }
  //   ); // invocation of the subscribe method
  // }

}
