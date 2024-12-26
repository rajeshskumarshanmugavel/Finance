import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ToastrModule } from 'ngx-toastr';
import { ColorPickerService } from 'ngx-color-picker';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { AdvertiserComponent } from './advertiser/advertiser.component';
import { CompanyComponent } from './company/company.component';
import { NetworkOwnerComponent } from './networkowner/networkowner.component';
import { CountryService } from './components/tables/table-services/counteries.service';
import { DecimalPipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScreenComponent } from './screen/screen.component';
import { StaffComponent } from './staff/staff.component';
import { CampaignComponent } from './campaign/campaign.component';
import { TemplateComponent } from './template/template.component';
import { PaymentComponent } from './payment/payment.component';
import { ReportComponent } from './report/report.component';
import { TicketComponent } from './ticket/ticket.component';
import { CmsComponent } from './cms/cms.component';
import { GlobalconfigComponent } from './globalconfig/globalconfig.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { MasterComponent } from './master/master.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AdvertiserComponent,
    CompanyComponent,
    NetworkOwnerComponent,
    DashboardComponent,
    ScreenComponent,
    StaffComponent,
    CampaignComponent,
    TemplateComponent,
    PaymentComponent,
    ReportComponent,
    TicketComponent,
    CmsComponent,
    GlobalconfigComponent,
    MasterComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HighlightModule,
    HttpClientModule,
    NgSelectModule
  ],
  providers: [ColorPickerService,
              DecimalPipe,
              CountryService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml')
        }
      }
    }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
