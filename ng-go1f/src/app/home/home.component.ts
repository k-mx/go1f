import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'go1f-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( title: Title ) {

    title.setTitle('go1f.pl — when shorter is better!');
  }

  ngOnInit() {
  }

}
