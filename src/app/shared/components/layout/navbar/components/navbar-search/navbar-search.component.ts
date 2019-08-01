import { Component, OnInit } from '@angular/core';
import { LOGOS } from '@app/shared/shared.data';

@Component({
  selector: 'app-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.scss']
})

export class NavBarSearchComponent implements OnInit {

  focused = false;
  logos = LOGOS;

  constructor() { }

  ngOnInit() { }

}
