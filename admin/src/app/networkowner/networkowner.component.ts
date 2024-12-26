import { Component, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../shared/directives/soratable.directive';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NetworkOwnerService } from '../components/tables/table-services/networkowner.service';
import { NetworkOwner } from '../components/tables/table-modal/networkowner.modal';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-networkowner',
  templateUrl: './networkowner.component.html',
  styleUrls: ['./networkowner.component.scss']
})
export class NetworkOwnerComponent {
    @ViewChild('messageModal') 
	  private messageModal!: TemplateRef<any>;
    @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
    
    networkowners:NetworkOwner[] = [];

    firstName: string = "";
    lastName: string = "";
    companyType: string = "";
    companyName : string = "";
    regNumber: string = "";
    vatNumber: string =""; 
    email: string = "";
    landline: string = "";
    mobile: string = "";
    address: string = "";
    postcode: string = "";
    
    currentId: number = 0;
    messageHeader:string = "";
	  message:string = "";

    isError:boolean = false;
	  errorMessage:string = "";

    constructor(private http: HttpClient, public service: NetworkOwnerService, private utilService: UtilService,
                private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.clearFields();
        this.refreshData();
    }

    clearFields() {
        this.firstName= "";
        this.lastName = "";
        this.companyType = "";
        this.companyName = "";
        this.regNumber = "";
        this.vatNumber = "";
        this.email = "";
        this.landline = "";
        this.mobile = "";
        this.address = "";
        this.postcode = "";
        this.networkowners = [];
        
        this.isError = false;
        this.errorMessage = "";
    }

    refreshData() {
        this.http.get<any>('/api/networkowner').subscribe(data => {
            this.networkowners = data as NetworkOwner[];
            this.service.setNetworkOwners(this.networkowners);
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

    isValid(firstName:string, lastName:string, companyType:string, companyName:string, regNumber:string, vatNumber:string,  email:string, landline:string, mobile:string, address:string, postcode:string): boolean {
        this.isError = false;
        this.errorMessage = "";
        if(this.firstName == "") {
          this.isError = true;
          this.errorMessage = "First Name is Empty";
          return false;
        }
        if(this.lastName == "") {
          this.isError = true;
          this.errorMessage = "Last Name is Empty";
          return false;
        }
        if(this.companyType == "") {
			this.isError = true;
			this.errorMessage = "Company Type is Empty";
			return false;
		}
        if(this.companyName == "") {
			this.isError = true;
			this.errorMessage = "Company Name is Empty";
			return false;
		}
        if(this.regNumber == "") {
			this.isError = true;
			this.errorMessage = "Registration Number is Empty";
			return false;
		}
        if(this.vatNumber == "") {
			this.isError = true;
			this.errorMessage = "VAT Number is Empty";
			return false;
		}
        if(this.email == "") {
          this.isError = true;
          this.errorMessage = "Email is Empty";
          return false;
        }
        if(!this.utilService.validateEmail(this.email)) {
          this.isError = true;
          this.errorMessage = "Invalid Email Id";
          return false;
        }
        if(this.landline == "") {
          this.isError = true;
          this.errorMessage = "Landline Number is Empty";
          return false;
        }
        if(this.mobile == "") {
          this.isError = true;
          this.errorMessage = "Mobile Number is Empty";
          return false;
        }
        if(this.address == "") {
          this.isError = true;
          this.errorMessage = "Address is Empty";
          return false;
        }
        if(this.postcode == "") {
            this.isError = true;
            this.errorMessage = "Post Code is Empty";
            return false;
          }
  

        return true;
    }

    onCreate(modal: any) {
        if(!this.isValid(this.firstName, this.lastName, this.companyType, this.companyName, this.regNumber, this.vatNumber, this.email, this.landline, this.mobile, this.address, this.postcode)) {
            return;
        }
        var formData = new FormData();
        
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
        
        this.http.post<any>('/api/addnetworkowner', formData).subscribe(data => {
            this.messageHeader = "Add Network Owner";
            this.message = "Network Owner has been added succesfully.";
            this.refreshData();
            this.openCenter(this.messageModal);
        });
        modal.dismiss();
    }

    findById(id: number) {
        for(var i = 0; i < this.networkowners.length; i++) {
            if(this.networkowners[i].id == id)
              return this.networkowners[i];
        }
    
        return null;
    }

    onEdit(id:any) {
        var obj = this.findById(id);
        if(obj == null) {
            return;
        }

      var networkowner:NetworkOwner = obj;
        this.currentId = networkowner.id;
        this.firstName = networkowner.firstName;
        this.lastName = networkowner.lastName;
        this.companyType = networkowner.companyType;
        this.companyName= networkowner.companyName;
        this.regNumber = networkowner.regNumber;
        this.vatNumber = networkowner.vatNumber;
        this.email = networkowner.email;
        this.landline = networkowner.landline;
        this.mobile = networkowner.mobile;
        this.address = networkowner.address;
        this.postcode = networkowner.postcode;
    }

    onSave(modal:any) {
        if(!this.isValid(this.firstName, this.lastName, this.companyType, this.companyName, this.regNumber, this.vatNumber, this.email, this.landline, this.mobile, this.address, this.postcode)) {
            return;
        }

        var formData = new FormData();
        formData.append("id", String(this.currentId));
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
        
        this.http.post<any>('/api/updatenetworkowner', formData).subscribe(data => {
            this.messageHeader = "Update Network Owner";
            this.message = "Network Owner has been updated succesfully.";
            this.refreshData();
            this.openCenter(this.messageModal);
        });
        modal.dismiss();
    }

    onDelete(id: any) {
        this.currentId = id;
        console.log(this.currentId);
    }

    onConfirmYes() {
        this.http.get<any>('/api/deletenetworkowner?id=' + this.currentId).subscribe(data => {
				    this.refreshData();
				    this.messageHeader = "Delete Network Owner";
				    this.message = "Deleted successfully";
				    this.openCenter(this.messageModal);
			  });
    }

    onRegNumberChanged() {
        this.http.get<any>('/api/companyInfo?regNo=' + this.regNumber).subscribe(data => {
            this.companyName = data.companyName;
            this.address = data.address;
            this.postcode = data.postcode;
        });
    }
}
