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
import { DashboardComponent } from './dashboard/dashboard.component';
import { CampaignbookingComponent } from './campaignbooking/campaignbooking.component';
import { UserguideComponent } from './userguide/userguide.component';
import { SupportComponent } from './support/support.component';
import { RaiseticketComponent } from './raiseticket/raiseticket.component';
import { TicketsComponent } from './tickets/tickets.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './auth.guard';
import { ReportComponent } from 'admin/src/app/report/report.component';
import { ReportsComponent } from './reports/reports.component';
import { ScreenComponent } from './screen/screen.component';
import { LivecampaignsComponent } from './livecampaigns/livecampaigns.component';
import { PaymentsComponent } from './payments/payments.component';
import { CampaignapprovalComponent } from './campaignapproval/campaignapproval.component';
import { InvoiceComponent } from './components/pages/invoice/invoice.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'dashboard/dashboard01',
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
    path: 'home',
    component: HomepageComponent,
    //canActivate: [AdminGuard],
   
  },
  {
    path: 'main', component: ContentLayoutComponent, canActivate: [AuthGuard],
    children: [
                  { path: '', component: DashboardComponent },
                  { path: 'dashboard', component: DashboardComponent },
                  { path: 'campaignbooking', component: CampaignbookingComponent },
                  { path: 'campaigns', component: CampaignsComponent },
                  { path: 'userguide', component: UserguideComponent },
                  { path: 'support', component: SupportComponent },
                  { path: 'raiseticket', component: RaiseticketComponent },
                  { path: 'tickets', component: TicketsComponent },
                  { path: 'reports', component: ReportsComponent },
                  { path: 'campaignapproval', component: CampaignapprovalComponent },
                  { path: 'livecampaigns', component: LivecampaignsComponent },
                  { path: 'payments', component: PaymentsComponent },
                  { path: 'screens', component: ScreenComponent },
                  { path: 'homepage', component: HomepageComponent },
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
