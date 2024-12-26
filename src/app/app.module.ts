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
import { CountryService } from './components/tables/table-services/counteries.service';
import { DecimalPipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { CampaignbookingComponent } from './campaignbooking/campaignbooking.component';
import { UserguideComponent } from './userguide/userguide.component';
import { SupportComponent } from './support/support.component';
import { RaiseticketComponent } from './raiseticket/raiseticket.component';
import { TicketsComponent } from './tickets/tickets.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './map/map.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReportsComponent } from './reports/reports.component';
import { ScreenComponent } from './screen/screen.component';
import { LivecampaignsComponent } from './livecampaigns/livecampaigns.component';
import { CampaignapprovalComponent } from './campaignapproval/campaignapproval.component';
import { PaymentsComponent } from './payments/payments.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CampaignbookingComponent,
    UserguideComponent,
    SupportComponent,
    RaiseticketComponent,
    TicketsComponent,
    CampaignsComponent,
    MapComponent,
    HomepageComponent,
    ReportsComponent,
    ScreenComponent,
    LivecampaignsComponent,
    CampaignapprovalComponent,
    PaymentsComponent,
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
    NgSelectModule,
    BrowserModule,
   GoogleMapsModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatFormFieldModule,
   MatInputModule,
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


