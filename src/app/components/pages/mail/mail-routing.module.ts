import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { MailComposeComponent } from './mail-compose/mail-compose.component';
import { MailSettingsComponent } from './mail-settings/mail-settings.component';
import { MailComponent } from './mail/mail.component';
import { ReadMailComponent } from './read-mail/read-mail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: 'mail',
        component: MailComponent
      },
      {
        path: 'mail-compose',
        component: MailComposeComponent
      },
      {
        path: 'mail-settings',
        component: MailSettingsComponent
      },
      {
        path: 'read-mail',
        component: ReadMailComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailRoutingModule { }
