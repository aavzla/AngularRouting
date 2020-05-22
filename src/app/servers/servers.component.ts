import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: { id: number, name: string, status: string }[] = [];

  constructor(
    private serversService: ServersService,
    private router: Router,
    //Activated Route give us access to the route loaded for this component.
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    /*
     * We are using a relative path here.
     * The router navigate method doesn't know on which route you are currently on.
     * Therefore, we neeed to pass a second argument to give the reference.
     * Here, we inject and add the activated route to the navigate method.
     */

    /*
     * In this case, the navigate route will try to go ./servers/servers.
     * Therefore, it will break because it doesn't exists.
     * So we comment it out.
     */
    //this.router.navigate(['servers'], { relativeTo: this.route });
  }
}
