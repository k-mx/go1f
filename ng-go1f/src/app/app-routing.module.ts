import { NgModule, InjectionToken }                     from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { TasksComponent }                               from './tasks/tasks.component';
import { EventsComponent }                              from './events/events.component';
import { AddEventComponent }                            from './add-event/add-event.component';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks',     component: TasksComponent },
  { path: 'events',    component: EventsComponent },
  { path: 'add-event', component: AddEventComponent },
  {
    path: 'externalRedirect',
    resolve: {
      url: externalUrlProvider,
    },
    // doesn't matter, we need component to create dummy route
    component: TasksComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide:  externalUrlProvider,
      useValue: (route: ActivatedRouteSnapshot) => {
        const externalUrl = route.paramMap.get('externalUrl');
        window.open(externalUrl, '_self');
      },
    },
  ],
})
export class AppRoutingModule { }
