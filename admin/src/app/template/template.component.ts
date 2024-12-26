import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent {
  @ViewChild('messageModal') 
  private messageModal!: TemplateRef<any>;

  modal: NgbDateStruct | undefined;

  previewUrl: string | null = null; 
  selectedFile: File | null = null;
  isImageFile: boolean = false;
  
 // file: File | null = null;
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
      this.selectedFile = null;
      this.isError=false;
      this.errorMessage="";
    }

     
  OnFileSelected(event: any) {
       const file = event.target.files[0];
        if (file) {
        this.selectedFile = file;
        const reader = new FileReader();
        // Check if file is an image or video
        const fileType = file.type;
        this.isImageFile = fileType.startsWith('image');
        reader.onload = (e: any) => {
        this.previewUrl = e.target.result; 
        };

        reader.readAsDataURL(file); 
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
  
    isImage(url: string): boolean {
      return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
    }

    isVideo(url: string): boolean {
      return /\.(mp4|mov|avi|mkv|webm|wmv)$/i.test(url);
    }

    onUpload(modal:any)
    {
        if(this.selectedFile == null)
        {
          this.isError = true;
          this.errorMessage = "File is not Selected";
          return;
        }

        var formData = new FormData();

        if(this.selectedFile!=null)
        {
          formData.append("file", this.selectedFile, this.selectedFile?.name);
        }
        console.log("Selected File:" ,this.selectedFile);
        this.http.post<any>('/api/uploadTemplate',formData).subscribe(data =>{
          this.messageHeader ="Upload Files";
          this.message="File has been uploaded Successfully";
          this.openCenter(this.messageModal);
        });
        modal.dismiss();
    }
 }
