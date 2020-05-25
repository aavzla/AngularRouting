import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string };
  //This subscription from Rxjs will hold the subscription so we can unsubscribe when this component is destroyed.
  //This is optional in this case. Angular will unsubscribe it for you because this subscription is part of his library.
  //If you create a custom subscription, you will need to handle the unsubscribe with the OnDestroy phase.
  //Please visit, https://angular.io/guide/router#observable-parammap-and-component-reuse.
  paramsSubscription: Subscription

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }

  ngOnDestroy() {
    //This log is for checking purposes of execution.
    //console.log(this.constructor.name + ' OnDestroy - unsubscribed the params for route.');
    this.paramsSubscription.unsubscribe();
  }
}
