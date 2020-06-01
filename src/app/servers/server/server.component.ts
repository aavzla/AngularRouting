import { Component, OnInit } from '@angular/core';

//import { ServersService } from '../servers.service';
import {
  ActivatedRoute,
  //Params,
  Router,
  Data
} from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(
    //private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        //The server in data['server'] should be the key that was configured in the routing of the module.
        //The key could be named as we wanted.
        this.server = data['server'];
      }
    );
    /*
    const serverId: number = +this.route.snapshot.queryParams['id'];
    this.server = this.serversService.getServer(serverId);
    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );
    */
  }

  onEdit() {
    this.router.navigate(
      //This is an absolute routing
      //['/servers', this.server.id, 'edit']
      //This is a relative routing
      ['edit'], {
        relativeTo: this.route,
        queryParamsHandling: 'preserve'
      }
    );
  }
}
