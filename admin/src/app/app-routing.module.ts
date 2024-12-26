import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './shared/guard/admin.guard';
import { ContentLayoutComponent } from './shared/layout-components/layout/content-layout/content-layout.component';
import { ErrorLayoutComponent } from './shared/layout-components/layout/error-layout/error-layout.component';
import { FullLayoutComponent } from './shared/layout-components/layout/full-layout/full-layout.component';
import { customRoute } from './shared/routes/custom.routes';
import { errorRoute } from './shared/routes/error.routes';
import { content } from './shared/routes/routes';
import { SwitcherLayoutComponent } from './shared/layout-components/layout/switcher-layout/switcher-layout.component';
import { SwitcherOneRoute } from './shared/routes/switcher';
import { AdvertiserComponent } from './advertiser/advertiser.component';
import { NetworkOwnerComponent } from './networkowner/networkowner.component';
import { CompanyComponent } from './company/company.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffComponent } from './staff/staff.component';
import { ScreenComponent } from './screen/screen.component';
import { CampaignComponent } from './campaign/campaign.component';
import { TemplateComponent } from './template/template.component';
import { PaymentComponent } from './payment/payment.component';
import { ReportComponent } from './report/report.component';
import { TicketComponent } from './ticket/ticket.component';
import { CmsComponent } from './cms/cms.component';
import { GlobalconfigComponent } from './globalconfig/globalconfig.component';
import { MasterComponent } from './master/master.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './auth.guard';
import { InvoiceComponent } from './components/pages/invoice/invoice.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/adminlogin',
    pathMatch: 'full'
  },
  // Vertical layout
  {
    path: '',
    component: ContentLayoutComponent,
    //canActivate: [AdminGuard],
    children: content
  },
  {
    path: '',
    component: SwitcherLayoutComponent,
    //canActivate: [AdminGuard],
    children: SwitcherOneRoute
  },
  {
    path: '',
    component: ErrorLayoutComponent,
    //canActivate: [AdminGuard],
    children: errorRoute
  },
  {
    path: '',
    component: FullLayoutComponent,
    //canActivate: [AdminGuard],
    children: customRoute
  },
  {
    path: 'adminlogin', component: LoginComponent
  },
  {
    path: 'admin', component: ContentLayoutComponent, canActivate: [AuthGuard],
    children: [
                  { path: '', component: DashboardComponent },
                  { path: 'dashboard', component: DashboardComponent },
                  { path: 'advertiser', component: AdvertiserComponent },
                  { path: 'company', component: CompanyComponent },
                  { path: 'networkowner', component: NetworkOwnerComponent },
                  { path: 'staff', component: StaffComponent },
		              { path: 'screen', component: ScreenComponent },
		              { path: 'campaign', component: CampaignComponent },
		              { path: 'template', component: TemplateComponent },
		              { path: 'payment', component: PaymentComponent },
		              { path: 'report', component: ReportComponent },
		              { path: 'ticket', component: TicketComponent },
		              { path: 'cms', component: CmsComponent },
		              { path: 'globalconfig', component: GlobalconfigComponent },
                  { path: 'master', component: MasterComponent },
                  { path: 'registration', component: RegistrationComponent },
                  { path: 'invoice', component: InvoiceComponent }
                 
                ]
  },
  {
    path: '',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '/error-pages/error-404'
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
