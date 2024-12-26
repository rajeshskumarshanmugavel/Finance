import { Component, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from '../shared/directives/soratable.directive';
import { Registration } from '../components/tables/table-modal/registration.modal';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from '../components/tables/table-services/registration.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  @ViewChild('messageModal') 
  private messageModal!: TemplateRef<any>;
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  registrations:Registration[] = [];

   userType: string = "";
  companyType: string = "";
  regNumber: string = "";
  companyName: string = "";
  vatNumber: string = "";
  address: string = "";
  postcode: string = "";
  mobile: string = "";
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  landline: string = "";

  currentId: number = 0;
  messageHeader:string = "";
  message:string = "";

 is_Approved: boolean = false;
 
  // isError:boolean = false;
  // errorMessage:string = "";

  constructor(private http: HttpClient, public service: RegistrationService, 
               private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.refreshData();
}

refreshData() {
 
  this.http.get<any>('/api/registration').subscribe(data => {
      this.registrations = data as Registration[];
      this.service.setregistrations(this.registrations);
  });
}


onSort({column, direction}: SortEvent | any) {
  this.headers.forEach(header => {
      if(header.sortable !== column) {
          header.direction = '';
      }
  });

  this.service.sortColumn = column;
  this.service.sortDirection = direction;
}

open(content: any) {
  this.modalService.open(content, {
      backdrop: 'static',
      windowClass: 'modalCusSty',
  });
}

openCenter(content: TemplateRef<any>) {
  this.modalService.open(content, { centered: true, backdrop: 'static', windowClass: 'modalCusSty' });
}

       findById(id: number) {
  for(var i = 0; i < this.registrations.length; i++) {
      if(this.registrations[i].id == id)
        return this.registrations[i];
  }
  
  return null;
}

onApproval(id:any,userType:any,firstName :any,lastName:any, companyType:any, companyName:any,regNumber:any,vatNumber:any,email:any,landline:any,mobile:any,address:any,postcode:any)
{
  this.currentId = id;

  this.userType=userType;
  this.firstName = firstName;
   this.lastName = lastName;
   this.companyType = companyType;
   this.companyName =companyName; 
   this.regNumber = regNumber;
   this.vatNumber = vatNumber;
   this.email = email;
   this.landline = landline;
   this.mobile = mobile;
   this.address = address;
   this.postcode = postcode; 
  
}


onConfirmYes() {
  
  var formData = new FormData();
  formData.append("userType", this.userType);
  formData.append("firstName", this.firstName);
  formData.append("lastName", this.lastName);
  formData.append("companyType", this.companyType);
  formData.append("companyName", this.companyName);
  formData.append("regNumber", this.regNumber);
  formData.append("vatNumber", this.vatNumber);
  formData.append("email", this.email);
  formData.append("landline", this.landline);
  formData.append("mobile", this.mobile);
  formData.append("address", this.address);
  formData.append("postcode", this.postcode);
  this.http.post<any>('/api/approve-registration', formData).subscribe(data => {
    this.refreshData();
       this.messageHeader = "Registration Approval";
       this.message = "Approved succesfully";
       this.openCenter(this.messageModal);
  });
  
  }
}