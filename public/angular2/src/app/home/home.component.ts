import {Component} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor( title: Title ) {

    title.setTitle('go1f.pl — when shorter is better!');
  }

}
