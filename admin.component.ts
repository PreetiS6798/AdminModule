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
  claim:Claim = new Claim();
  fetchedId:number;


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

  updateStatus(Claim) {
    this.adminService.updateStatus(this.claim)
      .subscribe(data => {
        console.log(data);
        
        
      }, error=>
      {
        console.log("Exception occured.")
      }
       );

  }
  onSubmit(event:any){
    this.fetchedId = 
 Number(event.target.attributes.id.value);
console.log(this.fetchedId);
    console.log(this.allClaims);
    for (let index = 0; index < this.allClaims.length; index++) {
      if(this.allClaims["claimId"]==this.fetchedId){
        this.claim = this.allClaims[index];
        this.claim.claimApprovalstatus=-1;

      }
      
    }
    this.updateStatus(this.claim);
  }

}
