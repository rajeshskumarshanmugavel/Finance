import { Component, QueryList,TemplateRef,ViewChild, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbdSortableMasterHeader, SortMasterEvent } from '../shared/directives/soratablemaster.directive';
import { MasterService } from '../components/tables/table-services/master.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Master } from '../components/tables/table-modal/master.modal';
import { SortEvent } from '../shared/directives/soratable.directive';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent {
    @ViewChild('messageModal') 
	  private messageModal!: TemplateRef<any>;
    @ViewChildren(NgbdSortableMasterHeader) headers!: QueryList<NgbdSortableMasterHeader>;
    
    masters: Master[] = [];

   Name: string = "";

    currentId: number = 0;
    messageHeader:string = "";
	  message:string = "";

    isError:boolean = false;
	  errorMessage:string = "";

  isOptionSelected: boolean = false; 
  selectedOption = 'industrytype';  // Set default value to "Industry Type"
  
  constructor(private http: HttpClient, public service: MasterService, private modalService: NgbModal) {
  }

onOptionSelect(): void {
  // this.isOptionSelected = !!this.selectedOption; // Set to true if an option is selected
  console.log('Selected option:', this.selectedOption); // Output the selected option
   this.refreshData();
   }

  ngOnInit(): void {

    this.clearFields();
    this.masters = [];
    this.refreshData();
  }

  clearFields(){
    this.Name = "";

    this.isError = false;
    this.errorMessage = "";
  }

refreshData() {
 
  this.http.get<any>('/api/master?selectedOption=' + this.selectedOption).subscribe(data => {
   this.masters = data as Master[];
      this.service.setmasters(this.masters);
  });
}

onSort({column, direction}: SortEvent | any) {
  this.headers.forEach(header => {
      if(header.sortable !== column) {
          header.direction = ''
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

  isValid(firstName:string): boolean {
    this.isError = false;
    this.errorMessage = "";
    if(this.Name == "") {
  this.isError = true;
  this.errorMessage = " Name is Empty";
  return false;
}
    return true;
}

 onCreate(modal: any) {
    if(!this.isValid(this.Name)) {
      return;
    }
    var formData = new FormData();

    formData.append("Name", this.Name);

     this.http.post<any>('/api/addmaster?selectedOption=' + this.selectedOption, formData).subscribe(data => {
        this.messageHeader = "Add Data";
        this.message = "Data has been added succesfully.";
        this.refreshData();
        this.openCenter(this.messageModal);
    });
    modal.dismiss();
}

findById(id: number) {
  for(var i = 0; i < this.masters.length; i++) {
      if(this.masters[i].id == id)
        return this.masters[i];
  }
  return null;
}

  onEdit(id:any) {
    var obj = this.findById(id);
        if(obj == null) {
          return;
        }

// var master = this.masters[i];
 var master:Master = obj;

   this.currentId = master.id;
   this.Name = master.Name;
    
}

onSave(modal:any) {
  if(!this.isValid(this.Name)) {
    return;
}

var formData = new FormData();
formData.append("id", String(this.currentId));
formData.append("Name", this.Name);
this.http.post<any>('/api/updatemaster?selectedOption=' + this.selectedOption, formData).subscribe(data => {
this.messageHeader = "Update Data";
this.message = "Data has been updated succesfully.";
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
 this.http.get<any>('/api/deletemaster', { 
      params: {
        selectedOption: this.selectedOption,
        id: this.currentId
      }
    }).subscribe(data => {   
   this.refreshData();
      this.messageHeader = "Delete Data";
      this.message = "Deleted successfully";
      this.openCenter(this.messageModal);
  });
}

}
