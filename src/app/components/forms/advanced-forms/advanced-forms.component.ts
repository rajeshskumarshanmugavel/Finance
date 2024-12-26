import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DropzoneComponent,
  DropzoneConfigInterface,
  DropzoneDirective,
} from 'ngx-dropzone-wrapper';
import { map, Observable } from 'rxjs';
import {
  FormElementsService,
  Month,
  Person,
} from '../form-elements/data.service';
import { FileuploadService } from './fileupload.service';

@Component({
  selector: 'app-advanced-forms',
  templateUrl: './advanced-forms.component.html',
  styleUrls: ['./advanced-forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedFormsComponent implements OnInit {
  heroForm!: FormGroup;
  cityForm!: FormGroup | any;
  people$!: Observable<any[]>;
  selectedPeopleMultiple = [];

  // ngx-mat-intel-input
  myForm: FormGroup | any;
  phoneNumber: any;

  submitPhone() {
    if (this.myForm.valid) {
      this.phoneNumber = this.myForm.get('phone').value;
      console.log(this.phoneNumber);
    }
  }

  get phoneValue() {
    return this.myForm.controls['phone'];
  }
  constructor(
    private fileUploadService: FileuploadService,
    private fb: FormBuilder,
    private FormElementsService: FormElementsService
  ) {
    this.myForm = this.fb.group({
      phone: [undefined, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.people$ = this.FormElementsService.getPeople();
    this.heroForm = this.fb.group({
      month: [null, Validators.required],
    });
    this.cityForm = this.fb.group({
      selectedCitiesIds: [],
    });
    // Month
    this.FormElementsService.getMonth().subscribe((ele) => (this.month = ele));
    this.month$ = this.FormElementsService.getMonth();
    // this.multiselect$ = this.FormElementsService.getMonth();

    this.FormElementsService.getPeople()
      .pipe(map((x: any) => x.filter((y: any) => !y.disabled)))
      .subscribe((res) => {
        this.people = res;
        this.selectedPeople = [];
      });
    this.companiesNames.forEach((c, i) => {
      this.companies.push({ id: i, name: c });
    });
  }

  // dropzone
  files: File[] = [];
  filesPreview: File[] = [];
  filesDisabled: File[] = [];
  disable = true;

  onSelect(event: any) {
    // console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  onPreviewFileSelect(event: any) {
    // console.log(event);
    this.filesPreview.push(...event.addedFiles);
  }

  onPreviewFileRemove(event: any) {
    // console.log(event);
    this.filesPreview.splice(this.filesPreview.indexOf(event), 1);
  }

  // dropzone-wrapper
  public type: string = 'component';

  public disabled: boolean = false;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
  };

  @ViewChild(DropzoneComponent, { static: false })
  componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective, { static: false })
  directiveRef?: DropzoneDirective;

  public toggleType(): void {
    this.type = this.type === 'component' ? 'directive' : 'component';
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public toggleAutoReset(): void {
    this.config.autoReset = this.config.autoReset ? null : 5000;
    this.config.errorReset = this.config.errorReset ? null : 5000;
    this.config.cancelReset = this.config.cancelReset ? null : 5000;
  }

  public toggleMultiUpload(): void {
    this.config.maxFiles = this.config.maxFiles ? 5 : 1;
  }

  public toggleClickAction(): void {
    this.config.clickable = !this.config.clickable;
  }

  public resetDropzoneUploads(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.reset();
    } else if (
      this.type === 'component' &&
      this.componentRef &&
      this.componentRef.directiveRef
    ) {
      this.componentRef.directiveRef.reset();
    }
  }

  public onUploadInit(args: any): void {
    // console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    // console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }

  //    file.io
  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  fileUpload: File | any = null; // Variable to store fileUpload

  // On fileUpload Select
  onChange(event: any) {
    this.fileUpload = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    // console.log(this.fileUpload);
    this.fileUploadService.upload(this.fileUpload).subscribe((event: any) => {
      if (typeof event === 'object') {
        // Short link via api response
        this.shortLink = event.link;

        this.loading = false; // Flag variable
      }
    });
  }

  // ng-select

  selectedAccount = 'AZ';
  accounts = [
    {
      name: 'Arizona',
      value: 'AZ',
      country: 'Mountain Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Colorado',
      value: 'CO',
      country: 'Mountain Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Idaho',
      value: 'ID',
      country: 'Mountain Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Montana',
      value: 'MT',
      country: 'Mountain Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Nebraska',
      value: 'NE',
      country: 'Mountain Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'New Mexico',
      value: 'NM',
      country: 'Mountain Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'North Dakota',
      value: 'AZ',
      country: 'Mountain Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Utah',
      value: 'UT',
      country: 'Mountain Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Wyoming',
      value: 'WY',
      country: 'Mountain Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Alabama',
      value: 'AL',
      country: 'Central Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Arkansas',
      value: 'AR',
      country: 'Central Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Illinois',
      value: 'IL',
      country: 'Central Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Iowa',
      value: 'IA',
      country: 'Central Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Kansas',
      value: 'KS',
      country: 'Central Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Kentucky',
      value: 'KY',
      country: 'Central Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Louisiana',
      value: 'LA',
      country: 'Central Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Minnesota',
      value: 'MN',
      country: 'Central Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Mississippi',
      value: 'MS',
      country: 'Central Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Missouri',
      value: 'MO',
      country: 'Central Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Oklahoma',
      value: 'OK',
      country: 'Central Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'South Dakota',
      value: 'SD',
      country: 'Central Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Texas',
      value: 'TX',
      country: 'Central Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Tennessee',
      value: 'TN',
      country: 'Central Time Zone',
      child: { state: 'Active' },
    },
    {
      name: 'Wisconsin',
      value: 'WI',
      country: 'Central Time Zone',
      child: { state: 'Active' },
    },
  ];
  selectedUsersList = ['Firefox'];
  UsersList = [
    { name: 'Firefox', value: 'Firefox' },
    { name: 'Chrome', value: 'Chrome' },
    { name: 'Safari', value: 'Safari' },
    { name: 'Opera', value: 'Opera' },
    { name: 'Internet Explorer', value: 'Internet Explorer' },
  ];

  month: Month[] = [];
  selectedMonth = '6';
  month$!: Observable<any[]>;
  people: Person[] = [];
  selectedPeople = [];
  selectedCompanies: any;
  companies: any[] = [];
  companiesNames = ['Uber', 'Microsoft', 'Flexigen'];

  toggleAgeDisable() {
    if (this.heroForm.controls['month'].disabled) {
      this.heroForm.controls['month'].enable();
    } else {
      this.heroForm.controls['month'].disable();
    }
  }

  // Group by Item Key
  GroupAccount = 'Adam';
  groupaccounts = [
    {
      name: 'Adam',
      email: 'adam@email.com',
      age: 12,
      country: 'United States',
      child: { state: 'Active' },
    },
    {
      name: 'Homer',
      email: 'homer@email.com',
      age: 47,
      country: '',
      child: { state: 'Active' },
    },
    {
      name: 'Samantha',
      email: 'samantha@email.com',
      age: 30,
      country: 'United States',
      child: { state: 'Active' },
    },
    {
      name: 'Amalie',
      email: 'amalie@email.com',
      age: 12,
      country: 'Argentina',
      child: { state: 'Active' },
    },
    {
      name: 'Estefanía',
      email: 'estefania@email.com',
      age: 21,
      country: 'Argentina',
      child: { state: 'Active' },
    },
    {
      name: 'Adrian',
      email: 'adrian@email.com',
      age: 21,
      country: 'Ecuador',
      child: { state: 'Active' },
    },
    {
      name: 'Wladimir',
      email: 'wladimir@email.com',
      age: 30,
      country: 'Ecuador',
      child: { state: 'Inactive' },
    },
    {
      name: 'Natasha',
      email: 'natasha@email.com',
      age: 54,
      country: 'Ecuador',
      child: { state: 'Inactive' },
    },
    {
      name: 'Nicole',
      email: 'nicole@email.com',
      age: 43,
      country: 'Colombia',
      child: { state: 'Inactive' },
    },
    {
      name: 'Michael',
      email: 'michael@email.com',
      age: 15,
      country: 'Colombia',
      child: { state: 'Inactive' },
    },
    {
      name: 'Nicolás',
      email: 'nicole@email.com',
      age: 43,
      country: 'Colombia',
      child: { state: 'Inactive' },
    },
  ];
  groupByFn = (item: any) => item.child.state;

  groupValueFn = (_: string, children: any[]) => ({
    name: children[0].child.state,
    total: children.length,
  });

  //
  selectedAccounts = [{ name: 'Adam' }];
  compareAccounts = (item: any, selected: any) => {
    if (selected.country && item.country) {
      return item.country === selected.country;
    }
    if (item.name && selected.name) {
      return item.name === selected.name;
    }
    return false;
  };
  //
  hideselectedAccounts = [{ name: 'Adam' }];
  hidecompareAccounts = (item: any, selected: any) => {
    if (selected.country && item.country) {
      return item.country === selected.country;
    }
    if (item.name && selected.name) {
      return item.name === selected.name;
    }
    return false;
  };

  // show/hide
  isCitiesControlVisible = true;
  cities: any[] = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys (Disabled)', disabled: true },
    { id: 4, name: 'Pabradė' },
  ];
  toggleCitiesControl() {
    this.isCitiesControlVisible = !this.isCitiesControlVisible;
  }

  clearCities() {
    this.cityForm.get('selectedCitiesIds').patchValue([]);
  }

  //  //
  addTagPromise(name: any) {
    return new Promise((resolve) => {
      this.loading = true;
      // Simulate backend call.
      setTimeout(() => {
        resolve({ id: 5, name: name, valid: true });
        this.loading = false;
      }, 1000);
    });
  }
}
