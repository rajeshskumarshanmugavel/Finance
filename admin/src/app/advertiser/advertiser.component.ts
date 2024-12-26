import { Component, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Advertiser } from '../components/tables/table-modal/advertiser.modal';
import { AdvertiserService } from '../components/tables/table-services/advertiser.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../util.service';
import { NgbdSortableHeader, SortEvent } from '../shared/directives/soratable.directive';

@Component({
  selector: 'app-advertiser',
  templateUrl: './advertiser.component.html',
  styleUrls: ['./advertiser.component.scss']
})
export class AdvertiserComponent {
    @ViewChild('messageModal') 
	  private messageModal!: TemplateRef<any>;
    @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
    
    advertisers:Advertiser[] = [];

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

    constructor(private http: HttpClient, private utilService: UtilService, public service: AdvertiserService, 
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
        this.postcode ="";
        this.password = "";
        this.advertisers = [];

        this.isError = false;
        this.errorMessage = "";
    }

    refreshData() {
        this.http.get<any>('/api/advertiser').subscribe(data => {
            this.advertisers = data as Advertiser[];
            this.service.setAdvertisers(this.advertisers);
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

    isValid(firstName:string, lastName:string, companyType:string, companyName:string, regNumber:string, vatNumber:string, email:string, landline:string, mobile:string, address:string, postcode:string): boolean {
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
        
        this.http.post<any>('/api/addadvertiser', formData).subscribe(data => {
            this.messageHeader = "Add Advertiser";
            this.message = "Advertiser has been added succesfully.";
            this.refreshData();
            this.openCenter(this.messageModal);
        });
        modal.dismiss();
    }

    findById(id: number) {
        for(var i = 0; i < this.advertisers.length; i++) {
            if(this.advertisers[i].id == id)
              return this.advertisers[i];
        }
        
        return null;
    }
    onEdit(id:any) {
        var obj = this.findById(id);
        if(obj == null) {
          return;
        }

        var advertiser:Advertiser = obj;

        this.currentId = advertiser.id;
        this.firstName = advertiser.firstName;
        this.lastName = advertiser.lastName;
        this.companyType = advertiser.companyType;
        this.companyName= advertiser.companyName;
        this.regNumber = advertiser.regNumber;
        this.vatNumber = advertiser.vatNumber;
        this.email = advertiser.email;
        this.landline = advertiser.landline;
        this.mobile = advertiser.mobile;
        this.address = advertiser.address;
        this.postcode = advertiser.postcode;
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

		this.http.post<any>('/api/updateadvertiser', formData).subscribe(data => {
			this.messageHeader = "Update Advertiser";
			this.message = "Advertiser has been updated succesfully.";
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
        this.http.get<any>('/api/deleteadvertiser?id=' + this.currentId).subscribe(data => {
				    this.refreshData();
				    this.messageHeader = "Delete Advertiser";
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
