import {Component} from '@angular/core';

@Component({
  selector:    'navbar',
  templateUrl: './navbar.component.html',
  styleUrls:   [ './navbar.component.css' ],
})

export class NavbarComponent {

  public links : { url: string, name: string }[];

  constructor() {
  }

  ngOnInit() {

    this.links = [
      { url: '/', name: 'Home' },
      { url: '/stfu', name: 'STFU' },
      { url: '/auth', name: 'Sign in'},
    ];
  }
}
