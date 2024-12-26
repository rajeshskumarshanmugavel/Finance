import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { FormElementsComponent } from './form-elements/form-elements.component';
import { AdvancedFormsComponent } from './advanced-forms/advanced-forms.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { FormWizardsComponent } from './form-wizards/form-wizards.component';
import { FormEditorComponent } from './form-editor/form-editor.component';
import { FormElementSizesComponent } from './form-element-sizes/form-element-sizes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IConfig } from 'ngx-mask';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
// import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { FormElementsService } from './form-elements/data.service';
export const options: Partial<IConfig> | (() => Partial<IConfig>) | any = null;
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneModule, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { FileuploadService } from './advanced-forms/fileupload.service';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {MatStepperModule} from '@angular/material/stepper';
import { FromInputSpinnersComponent } from './form-input-spinners/form-input-spinners.component';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  acceptedFiles: 'image/*',
  createImageThumbnails: true
};

@NgModule({
  declarations: [
    FormElementsComponent,
    AdvancedFormsComponent,
    FormLayoutsComponent,
    FormValidationComponent,
    FormWizardsComponent,
    FormEditorComponent,
    FormElementSizesComponent,
    FromInputSpinnersComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsRoutingModule,
    SharedModule,
    ColorPickerModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    NgSelectModule,
    // NgOptionHighlightModule,
    DropzoneModule,
    NgxDropzoneModule,
    NgxMatIntlTelInputComponent,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatIconModule,
    ToastrModule,
    MatStepperModule,
    CKEditorModule,
    AngularEditorModule,
  ],
  providers: [
    FormElementsService,
    FileuploadService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    ToastrService
  ]
})
export class FormModule { }
