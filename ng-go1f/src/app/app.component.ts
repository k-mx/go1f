import { Component } from '@angular/core';

@Component({
  selector: '[go1f-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title : string = 'go1f';
  year  : number = new Date().getFullYear();
}
