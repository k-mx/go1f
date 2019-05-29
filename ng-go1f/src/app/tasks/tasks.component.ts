import { Component, OnInit } from '@angular/core';
import { Title }             from '@angular/platform-browser';

@Component({
  selector: 'go1f-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor( title: Title ) {

    title.setTitle('go1f.pl — when shorter is better!');
  }

  ngOnInit() {
  }

}
