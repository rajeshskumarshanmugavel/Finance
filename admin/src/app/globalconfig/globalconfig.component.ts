import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SortEvent } from '../shared/directives/soratable.directive';

@Component({
  selector: 'app-globalconfig',
  templateUrl: './globalconfig.component.html',
  styleUrls: ['./globalconfig.component.scss']
})
export class GlobalconfigComponent {

  @ViewChild('messageModal') 
  private messageModal!: TemplateRef<any>;

  modal: NgbDateStruct | undefined;
file: File | null = null;
  messageHeader:string = "";
	message:string = "";
	isError:boolean = false;
	errorMessage:string = "";
  
  

  constructor(private modalService: NgbModal, private http: HttpClient) {
    }
  
  
    ngOnInit(): void {

      this.clearFields();
      
    }
  
    clearFields(){
      this.file = null;
     this.isError = false;
      this.errorMessage = "";
    }
  
  onFileSelected(event: any): void {

    var files = null;
    	if(event.target != undefined) {
    	  files = (event.target as HTMLInputElement).files;
    	}
    
    	if(files != null) {
    	  this.file = files.item(0);
    	}

  }
  
  open(content: any) {
    this.modalService.open(content, {
        backdrop: 'static',
        windowClass: 'modalCusSty',
    });
}


  openCenter(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
}

  onUpload(modal:any) {

    if(this.file == null) {
			this.isError = true;
			this.errorMessage = "File is not selected";
			return;
		}

    var formData = new FormData();

    if(this.file != null) {
      formData.append("file", this.file, this.file?.name);
    }

    this.http.post<any>('/api/uploadUserGuide', formData).subscribe(data => {
      this.messageHeader = "Upload File";
      this.message = "File has been uploaded succesfully.";
      //this.refreshData();
      this.openCenter(this.messageModal);
  });
  modal.dismiss();
  }
}










  