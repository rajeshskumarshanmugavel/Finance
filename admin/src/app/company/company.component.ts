import { Component, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../shared/directives/soratable.directive';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Company } from '../components/tables/table-modal/company.modal';
import { CompanyService } from '../components/tables/table-services/company.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
    [x: string]: any;
    @ViewChild('messageModal') 
	  private messageModal!: TemplateRef<any>;
    @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
    
    companyes:Company[] = [];

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
    postcode: string="";
    password: string ="";

    currentId: number = 0;
    messageHeader:string = "";
	  message:string = "";

    isError:boolean = false;
	  errorMessage:string = "";
    

    constructor(private http: HttpClient, public service: CompanyService, private utilService: UtilService,
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
        // this.password = "";
        this.companyes = [];

        this.isError = false;
        this.errorMessage = "";
    }

    refreshData() {
        this.http.get<any>('/api/agency').subscribe(data => {
            this.companyes = data as Company[];
            this.service.setcompanyes(this.companyes);
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

    isValid(firstName: string, lastName: string, companyType: string, companyName: string, regNumber: string, vatNumber: string, email: string, landline: string, mobile: string, address: string, postcode: string): boolean {
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

        if(this.landline== "") {
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
        
        this.http.post<any>('/api/addagency', formData).subscribe(data => {
            this.messageHeader = "Add Agency";
            this.message = "Agency has been added succesfully.";
            this.refreshData();
            this.openCenter(this.messageModal);
        });
        modal.dismiss();
    }

    findById(id: number) {
        for(var i = 0; i < this.companyes.length; i++) {
            if(this.companyes[i].id == id)
              return this.companyes[i];
        }
      
        return null;
    }

    onEdit(id:any) {
      var obj = this.findById(id);
      if(obj == null) {
        return;
      }

      var company:Company = obj;

        this.currentId = company.id;
        this.firstName = company.firstName;
        this.lastName = company.lastName;
        this.companyType = company.companyType;
        this.companyName= company.companyName;
        this.regNumber = company.regNumber;
        this.vatNumber = company.vatNumber;
        this.email = company.email;
        this.landline = company.landline;
        this.mobile = company.mobile;
        this.address = company.address;
        this.postcode = company.postcode;
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

        this.http.post<any>('/api/updateagency', formData).subscribe(data => {
            this.messageHeader = "Update Agency";
            this.message = "Agency has been updated succesfully.";
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
        this.http.get<any>('/api/deleteagency?id=' + this.currentId).subscribe(data => {
				    this.refreshData();
				    this.messageHeader = "Delete Agency";
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
