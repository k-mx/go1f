import { NgModule }                from '@angular/core';
import { HttpClientModule }        from '@angular/common/http';
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule }     from '@angular/forms';

import { AppComponent }         from './app.component';
import { NavbarComponent }      from './navbar/navbar.component';
import { AppRoutingModule }     from './app-routing.module';
import { ExternalUrlDirective } from './external-url.directive';
import { BackEndConfigService } from './back-end-config.service';
import { GithubService }        from './github.service';
import { AuthService }          from './auth.service';
import { TasksComponent }       from './tasks/tasks.component';
import { EventsComponent }      from './events/events.component';
import { AddEventComponent }    from './add-event/add-event.component';
import { TextInputComponent }   from './shared/components/text-input/text-input.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ExternalUrlDirective,
        TasksComponent,
        EventsComponent,
        AddEventComponent,
        TextInputComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers: [
        AuthService,
        BackEndConfigService,
        GithubService,
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule { }
