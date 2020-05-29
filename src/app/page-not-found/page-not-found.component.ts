import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  pageNotFoundMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //This is for the case that the message is static. So, it doesn't change.
    this.pageNotFoundMessage = this.route.snapshot.data['message'];

    //This is for the case that the message could be change dynamically.
    /*
    this.route.data.subscribe(
      (data: Data) => {
        this.pageNotFoundMessage = data['message'];
      }
    );
    */
  }

}
