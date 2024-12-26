import { Component, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../shared/directives/soratable.directive';
import { HttpClient } from '@angular/common/http';
import { Screen } from '../components/tables/table-modal/screen.modal';
import { ScreenService } from '../components/tables/table-services/screen.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent {
  @ViewChild('messageModal') 
	  private messageModal!: TemplateRef<any>;
    @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
    
    screens:Screen[] = [];

    
    screenName : string = "";
    screenId : string = "";
    NoScreenId :string = "";
    location :string = "";
    resWidth :string = "";
    resHeight : string = "";
    width : string = "";
    height :  string = "";
    loop : string = "";
    NoOFscreens : string = "";
    latitude : string = "";
    longitude : string = "";
    mediaType : string = "";
    environment :string = "";
    sector : string = "";
     

    currentId: number = 0;
    messageHeader:string = "";
	message:string = "";

    isError:boolean = false;
	errorMessage:string = "";

    constructor(private http: HttpClient, public service: ScreenService, 
                 private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.clearFields();
        this.refreshData();
    }

    clearFields() {
       
        this.screenName = "";
        this.screenId = "";
        this.NoScreenId = "";
        this.location = "";
        this.resWidth = "";
        this.resHeight = "";
       this.width  = "";
       this.height  = "";
       this.loop  = "";
       this.NoOFscreens  = "";
       this.latitude  = "";
       this.longitude  = "";
       this.mediaType  = "";
       this.environment = "";
       this.sector = "";

        this.screens = [];

        this.isError = false;
        this.errorMessage = "";
    }

    refreshData() {
        this.http.get<any>('/api/screen').subscribe(data => {
            this.screens = data as Screen[];
            this.service.setScreens(this.screens);
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

    isValid(screenName:string, NoScreenId:string, location:string, resWidth:string, resHeight:string, Width:string, height:string, loop:string, NoOFscreens:string, latitude:string, longitude:string, mediaType:string, environment:string, sector:string ): boolean {
        this.isError = false;
		this.errorMessage = "";
		if(this.screenName == "") {
			this.isError = true;
			this.errorMessage = "Screen Name is Empty";
			return false;
		}
        // if(this.screenId == "") {
		// 	this.isError = true;
		// 	this.errorMessage = "Screen Id is Empty";
		// 	return false;
		// }
        if(this.NoScreenId == "") {
			this.isError = true;
			this.errorMessage = "No Screen Id is Empty";
			return false;
		}

        if(this.location == "") {
			this.isError = true;
			this.errorMessage = "Location is Empty";
			return false;
		}
        if(this.resWidth == "") {
			this.isError = true;
			this.errorMessage = "RES Width is Empty";
			return false;
		}
        if(this.resHeight == "") {
			this.isError = true;
			this.errorMessage = "RES Height is Empty";
			return false;
		}
        if(this.width == "") {
			this.isError = true;
			this.errorMessage = "Width is Empty";
			return false;
		}
        if(this.height == "") {
			this.isError = true;
			this.errorMessage = "Height is Empty";
			return false;
		}
        if(this.loop == "") {
			this.isError = true;
			this.errorMessage = "Loop is Empty";
			return false;
		}
        if(this.NoOFscreens == "") {
			this.isError = true;
			this.errorMessage = "No Of Screens is Empty";
			return false;
		}
        if(this.latitude == "") {
			this.isError = true;
			this.errorMessage = "Latitude is Empty";
			return false;
		}
        if(this.longitude == "") {
			this.isError = true;
			this.errorMessage = "Longitude is Empty";
			return false;
		}
        if(this.mediaType == "") {
			this.isError = true;
			this.errorMessage = "Media Type is Empty";
			return false;
		}
        if(this.environment == "") {
			this.isError = true;
			this.errorMessage = "Environment is Empty";
			return false;
		}
        if(this.sector == "") {
			this.isError = true;
			this.errorMessage = "Sector is Empty";
			return false;
		}
        return true;
    }

    onCreate(modal: any) {
        if(!this.isValid(this.screenName, this.NoScreenId,  this.location, this.resWidth, this.resHeight, this.width, this.height, this.loop, this.NoOFscreens, this.latitude, this.longitude, this.mediaType, this.environment, this.sector)) {
            return;
        }
        var formData = new FormData();
        
        formData.append("screenName", this.screenName);
        // formData.append("screenId", this.screenId);
        formData.append("NoScreenId", this.NoScreenId);
        formData.append("location", this.location);
        formData.append("resWidth", this.resWidth);
        formData.append("resHeight", this.resHeight);
        formData.append("width", this.width);
        formData.append("height", this.height);
        formData.append("loop", this.loop);
        formData.append("NoOFscreens", this.NoOFscreens);
        formData.append("latitude", this.latitude);
        formData.append("longitude", this.longitude);
        formData.append("mediaType", this.mediaType);
        formData.append("environment", this.environment);
        formData.append("sector", this.sector);
        
        this.http.post<any>('/api/addscreen', formData).subscribe(data => {
            this.messageHeader = "Add Screen";
            this.message = "Screen has been added succesfully.";
            this.refreshData();
            this.openCenter(this.messageModal);
        });
        modal.dismiss();
    }

    findById(id: number) {
        for(var i = 0; i < this.screens.length; i++) {
            if(this.screens[i].id == id)
              return this.screens[i];
        }
        
        return null;
    }
    onEdit(id:any) {
        var obj = this.findById(id);
        if(obj == null) {
          return;
        }

        var screen:Screen = obj;

        this.currentId = screen.id;
       
        this.screenName = screen.screenName;
        // this.screenId = screen.screenId;
         this.NoScreenId = screen.NoScreenId;
        this.location = screen.location;
        this.resWidth = screen.resWidth;
        this.resHeight = screen.resHeight;
        this.width = screen.width;
        this.height = screen.height;
        this.loop = screen.loop;
        this.NoOFscreens = screen.NoOFscreens;
        this.latitude = screen.latitude;
        this.longitude = screen.longitude;
        this.mediaType = screen.mediaType;
        this.environment = screen.environment;
        this.sector = screen.sector;
       
    }

    onSave(modal:any) {
        if(!this.isValid(this.screenName, this.NoScreenId, this.location, this.resWidth, this.resHeight, this.width, this.height, this.loop, this.NoOFscreens, this.latitude, this.longitude, this.mediaType, this.environment, this.sector)) {
            return;
        }

		var formData = new FormData();
        formData.append("id", String(this.currentId));
		 formData.append("screenName", this.screenName);
        // formData.append("screenId", this.screenId);
         formData.append("NoScreenId", this.NoScreenId);
        formData.append("location", this.location);
        formData.append("resWidth", this.resWidth);
        formData.append("resHeight", this.resHeight);
        formData.append("width", this.width);
        formData.append("height", this.height);
        formData.append("loop", this.loop);
        formData.append("NoOFscreens", this.NoOFscreens);
        formData.append("latitude", this.latitude);
        formData.append("longitude", this.longitude);
        formData.append("mediaType", this.mediaType);
        formData.append("environment", this.environment);
        formData.append("sector", this.sector);

		this.http.post<any>('/api/updatescreen', formData).subscribe(data => {
			this.messageHeader = "Update Screen";
			this.message = "Screen has been updated succesfully.";
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
        this.http.get<any>('/api/deletescreen?id=' + this.currentId).subscribe(data => {
				    this.refreshData();
				    this.messageHeader = "Delete Screen";
				    this.message = "Deleted successfully";
				    this.openCenter(this.messageModal);
			  });
    }
}
