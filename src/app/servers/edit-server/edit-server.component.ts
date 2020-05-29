import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    //these logs are to prove the state of the snapshot queryParams and Fragment against their direct access.
    //This is how we can retreive Query parameters and Fragments from the active route.
    //console.log(this.constructor.name + ' OnInit - Snapshot of QueryParams.', this.route.snapshot.queryParams);
    //console.log(this.constructor.name + ' OnInit - Snapshot of Fragment.', this.route.snapshot.fragment);

    //console.log(this.constructor.name + ' OnInit - QueryParams.', this.route.queryParams);
    //console.log(this.constructor.name + ' OnInit - Fragment.', this.route.fragment);

    //This is the alternative way to have access to the changes in these query params and fragments, to subscribe.
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      }
    );
    //This will be used later, so i will comment these for now.
    //this.route.fragment.subscribe();

    //Get the id from the route and subscribe to update the server based on changes of the id in route.
    let id: number = this.route.snapshot.params['id'] === undefined ? 1 : +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.route.params.subscribe(
      (params: Params) => {
        if (params['id'] !== undefined) {
          this.server = this.serversService.getServer(+params['id']);
        }
      }
    );
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    //This will update the flag property of the state of the edit.
    //The path is relative and it goes up one level. please visit, https://angular.io/guide/router#relative-navigation.
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }

    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status)
      && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}
