import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }         from './app.component';
import { NavbarComponent }      from './navbar/navbar.component';
import { HomeComponent }        from './home/home.component';
import { AppRoutingModule }     from './app-routing.module';
import { ExternalUrlDirective } from './external-url.directive';
import { BackEndConfigService } from './back-end-config.service';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        ExternalUrlDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [ BackEndConfigService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
