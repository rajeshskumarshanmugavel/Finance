import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss']
})
export class FormValidationComponent implements OnInit {
    //angular
    public customForm! : FormGroup;
    public defaultForm! : FormGroup;
    customTooltipForm!: FormGroup;

    constructor(private formBuilder : FormBuilder) { }

    ngOnInit(): void {
      this.customForm = this.formBuilder.group({
        firstname : ['',[Validators.required]],
        lastname : ['',[Validators.required]],
        city : ['',[Validators.required]],
        selectState : ['',[Validators.required]],
        zip : ['', Validators.required]
      });
      this.defaultForm = this.formBuilder.group({
        firstname : ['',[Validators.required]],
        lastname : ['',[Validators.required]],
        city : ['',[Validators.required]],
        selectState : ['',[Validators.required]],
        zip : ['', Validators.required]
      });
      this.customTooltipForm = this.formBuilder.group({
        firstname : ['',[Validators.required]],
        lastname : ['',[Validators.required]],
        city : ['',[Validators.required]],
        selectState : ['',[Validators.required]],
        zip : ['', Validators.required]
      });
    }

    Submit(){
      if (this.customForm.controls['firstname'].value !== "" &&
        this.customForm.controls['lastname'].value !== ""  &&
        this.customForm.controls['city'].value !== ""  &&
        this.customForm.controls['selectState'].value !== ""  &&
        this.customForm.controls['zip'].value !== ""
      )
      {
        console.log('success')
      }
      else{
        let tag = document.querySelector('.needs-validation')
        tag?.classList.add('was-validated')
      }
    }
    TooltipSubmit(){
      if (this.customTooltipForm.controls['firstname'].value !== "" &&
        this.customTooltipForm.controls['lastname'].value !== ""  &&
        this.customTooltipForm.controls['city'].value !== ""  &&
        this.customTooltipForm.controls['selectState'].value !== ""  &&
        this.customTooltipForm.controls['zip'].value !== ""
      )
      {
        console.log('success')
      }
      else{
        let tag = document.querySelector('.needs-validations')
        tag?.classList.add('was-validated')
      }
    }

    defaultSubmit(){
      if (this.defaultForm.controls['firstname'].value !== "" &&
        this.defaultForm.controls['lastname'].value !== ""  &&
        this.defaultForm.controls['city'].value !== ""  &&
        this.defaultForm.controls['selectState'].value !== ""  &&
        this.defaultForm.controls['zip'].value !== ""
      )
      {
        console.log('success')
      }
      else{
        console.log('error')
      }
    }

}
