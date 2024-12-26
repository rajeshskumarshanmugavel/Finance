import { Component, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../shared/directives/soratable.directive';
import { HttpClient } from '@angular/common/http';
import { Staff } from '../components/tables/table-modal/staff.modal';
import { StaffService } from '../components/tables/table-services/staff.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent {
    @ViewChild('messageModal') 
	  private messageModal!: TemplateRef<any>;
    @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
    
    staffs:Staff[] = [];

    firstName: string = "";
    lastName: string = "";
    email: string = "";
    phone: string = "";
    address: string = "";

    currentId: number = 0;
    messageHeader:string = "";
	  message:string = "";

    isError:boolean = false;
	  errorMessage:string = "";

    constructor(private http: HttpClient, public service: StaffService, 
                private utilService: UtilService, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.clearFields();
        this.refreshData();
    }

    clearFields() {
        this.firstName= "";
        this.lastName = "";
        this.email = "";
        this.phone = "";
        this.address = "";
        this.staffs = [];

        this.isError = false;
        this.errorMessage = "";
    }

    refreshData() {
        this.http.get<any>('/api/staff').subscribe(data => {
            this.staffs = data as Staff[];
            this.service.setStaffs(this.staffs);
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

    isValid(firstName:string, lastName:string, email:string, phone:string, address:string): boolean {
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

        if(this.phone == "") {
			      this.isError = true;
			      this.errorMessage = "Phone is Empty";
			      return false;
		    }

        if(this.address == "") {
			      this.isError = true;
			      this.errorMessage = "Address is Empty";
			      return false;
		    }

        return true;
    }

    onCreate(modal: any) {
        if(!this.isValid(this.firstName, this.lastName, this.email, this.phone, this.address)) {
            return;
        }
        var formData = new FormData();
        
        formData.append("firstName", this.firstName);
        formData.append("lastName", this.lastName);
        formData.append("email", this.email);
        formData.append("phone", this.phone);
        formData.append("address", this.address);
        
        this.http.post<any>('/api/addstaff', formData).subscribe(data => {
            this.messageHeader = "Add Staff";
            this.message = "Staff has been added succesfully.";
            this.refreshData();
            this.openCenter(this.messageModal);
        });
        modal.dismiss();
    }

    findById(id: number) {
        for(var i = 0; i < this.staffs.length; i++) {
            if(this.staffs[i].id == id)
              return this.staffs[i];
        }
        
        return null;
    }
    onEdit(id:any) {
        var obj = this.findById(id);
        if(obj == null) {
          return;
        }

        var staff:Staff = obj;

        this.currentId = staff.id;
        this.firstName = staff.firstName;
        this.lastName = staff.lastName;
        this.email = staff.email;
        this.phone = staff.phone;
        this.address = staff.address;
    }

    onSave(modal:any) {
        if(!this.isValid(this.firstName, this.lastName, this.email, this.phone, this.address)) {
            return;
        }

		    var formData = new FormData();
		    formData.append("id", String(this.currentId));
		    formData.append("firstName", this.firstName);
        formData.append("lastName", this.lastName);
        formData.append("email", this.email);
        formData.append("phone", this.phone);
        formData.append("address", this.address);
		    this.http.post<any>('/api/updatestaff', formData).subscribe(data => {
			      this.messageHeader = "Update Staff";
			      this.message = "Staff has been updated succesfully.";
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
        this.http.get<any>('/api/deletestaff?id=' + this.currentId).subscribe(data => {
				    this.refreshData();
				    this.messageHeader = "Delete Staff";
				    this.message = "Deleted successfully";
				    this.openCenter(this.messageModal);
			  });
    }
}
