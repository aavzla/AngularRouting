import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //these logs are to prove the state of the snapshot queryParams and Fragment against their direct access.
    //This is how we can retreive Query parameters and Fragments from the active route.
    console.log(this.constructor.name + ' OnInit - Snapshot of QueryParams.', this.route.snapshot.queryParams);
    console.log(this.constructor.name + ' OnInit - Snapshot of Fragment.', this.route.snapshot.fragment);

    console.log(this.constructor.name + ' OnInit - QueryParams.', this.route.queryParams);
    console.log(this.constructor.name + ' OnInit - Fragment.', this.route.fragment);

    //This is the alternative way to have access to the changes in these query params and fragments, to subscribe.
    //This will be used later, so i will comment these for now.
    //this.route.queryParams.subscribe();
    //this.route.fragment.subscribe();

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
