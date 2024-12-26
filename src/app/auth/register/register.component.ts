import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from 'admin/src/app/util.service';
import { Register } from 'src/app/components/tables/table-modal/register.modal';
import { RegisterService } from 'src/app/components/tables/table-services/registers.services';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/soratable.directive';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

  export class RegisterComponent {
  @ViewChild('messageModal') 
  private messageModal!: TemplateRef<any>;
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  registers:Register[] = [];

  firstName: string = "";
  lastName: string = "";
  userType: string = "";
  companyType: string = "";
  companyName: string = "";
  regNumber: string = "";
  vatNumber: string = "";
  email: string = "";
  landline: string = "";
  mobile: string = "";
  address: string = "";
  postcode: string = "";

  // currentId: number = 0;
  messageHeader:string = "";
  message:string = "";

  isError:boolean = false;
  errorMessage:string = "";
  modal: any;
  

  constructor(private http: HttpClient, public service: RegisterService, 
              private utilService: UtilService, private modalService: NgbModal, private activatedRoute: ActivatedRoute) {
      this.activatedRoute.params.subscribe(val=> {
          var userType = this.activatedRoute.snapshot.paramMap.get('role');
          this.userType = (userType != null? userType : "");
      });
}
  
ngOnInit(): void {
  this.clearFields();
  document.querySelector('body')?.classList.remove('horizontal');
    document.body.className = "ltr error-page1 bg-primary"
  
}
clearFields() {
  this.firstName= "";
  this.lastName = "";
  this.companyType = "";
  this.companyName = "";
  this.regNumber= "";
  this.vatNumber= "";
  this.email = "";
  this.landline= "";
  this.mobile = "";
  this.address = "";
  this.postcode = "";
  
  this.registers = [];

  this.isError = false;
  this.errorMessage = "";
}

  onSort({column, direction}: SortEvent | any) {
    this.headers.forEach((header: { sortable: any; direction: string; }) => {
        if(header.sortable !== column) {
            header.direction = '';
        }
    });

    this.service.sortRegisterColumn = column;
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
          // if(this.userType == "") {
          //   this.isError = true;
          //   this.errorMessage = "User Type is Empty";
          //   return false;
          //   }
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
          this.errorMessage = "Mobile Numberis Empty";
          return false;
          }
            if(this.address == "") {
          this.isError = true;
          this.errorMessage = "Address is Empty";
          return false;
          }
          if(this.postcode == "") {
            this.isError = true;
            this.errorMessage = "Postcode is Empty";
            return false;
            }

            return true;
          }
  onCreate(modal: any) {
    if(!this.isValid(this.firstName, this.lastName, this.userType, this.companyType, this.companyName, this.regNumber, this.vatNumber, this.email, this.landline, this.mobile, this.address)) {
        return;
    }
    var formData = new FormData();
    formData.append("firstName", this.firstName);
    formData.append("lastName", this.lastName);
    formData.append("userType", this.userType);
    formData.append("companyType", this.companyType);
    formData.append("companyName", this.companyName);
    formData.append("regNumber", this.regNumber);
    formData.append("vatNumber", this.vatNumber);
    formData.append("email", this.email);
    formData.append("landline", this.landline);
    formData.append("mobile", this.mobile);
    formData.append("address", this.address);
    formData.append("postcode",this.postcode);
    console.log("user Type:",this.userType);

    this.http.post<any>('/api/addregister', formData).subscribe(data => {
        this.messageHeader = "Add User ";
        this.message = "Registered succesfully.";
        this.openCenter(this.messageModal);
    });
    modal.dismiss();
}

  // ngOnInit(): void {
  //   document.querySelector('body')?.classList.remove('horizontal');
  //   document.body.className = "ltr error-page1 bg-primary"
  // }

  // ngOnDestroy() {
  //   document.body.className = "ltr main-body app sidebar-mini"
  //  }

    onRegNumberChanged() {
        this.http.get<any>('/api/companyInfo?regNo=' + this.regNumber).subscribe(data => {
            this.companyName = data.companyName;
            this.address = data.address;
            this.postcode = data.postcode;
        });
    }
}

