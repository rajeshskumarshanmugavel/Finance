import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailRoutingModule } from './mail-routing.module';
import { MailComponent } from './mail/mail.component';
import { MailComposeComponent } from './mail-compose/mail-compose.component';
import { MailSettingsComponent } from './mail-settings/mail-settings.component';
import { ChatComponent } from './chat/chat.component';
import { ReadMailComponent } from './read-mail/read-mail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';


@NgModule({
  declarations: [
    MailComponent,
    MailComposeComponent,
    MailSettingsComponent,
    ChatComponent,
    ReadMailComponent
  ],
  imports: [
    CommonModule,
    MailRoutingModule,
    NgbModule,
    SharedModule,
    NgSelectModule,
    NgScrollbarModule
  ],
  providers: [

  ]
})
export class MailModule { }
