import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedFormsComponent } from './advanced-forms/advanced-forms.component';
import { FormEditorComponent } from './form-editor/form-editor.component';
import { FormElementSizesComponent } from './form-element-sizes/form-element-sizes.component';
import { FormElementsComponent } from './form-elements/form-elements.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { FormWizardsComponent } from './form-wizards/form-wizards.component';
import { FromInputSpinnersComponent } from './form-input-spinners/form-input-spinners.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'advanced-forms',
        component: AdvancedFormsComponent
      },
      {
        path: 'form-editors',
        component: FormEditorComponent
      },
      {
        path: 'form-element-sizes',
        component: FormElementSizesComponent
      },
      {
        path: 'form-elements',
        component: FormElementsComponent
      },
      {
        path: 'form-layouts',
        component: FormLayoutsComponent
      },
      {
        path: 'form-validations',
        component: FormValidationComponent
      },
      {
        path: 'form-wizards',
        component: FormWizardsComponent
      },
      {
        path: 'from-input-spinners',
        component: FromInputSpinnersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
