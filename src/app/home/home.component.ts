import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLoadServers() {
    //This method is to show how we can navigate programmatically.
    this.router.navigate(['/servers'])
  }

  onLoadServer(id: number) {
    //This method is to show how we can navigate programmatically with query param.
    this.router.navigate(
      ['/servers', id, 'edit'],
      {
        queryParams: { allowEdit: '1' },
        fragment: 'loading'
      }
    );
  }
}
