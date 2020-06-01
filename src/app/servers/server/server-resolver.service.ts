import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { ServersService } from "../servers.service";

//Definition of the interface wanted. This should be placed in a separate file and imported here.
interface Server {
  id: number,
  name: string,
  status: string
}

//The injectable is needed to inject the serversService into this service.
@Injectable()
export class ServerResolver
  //this is an definition of an object with this properties wanted. This could be usefull if we do not have more than 2 properties.
  //implements Resolve<{ id: number, name: string, status: string }>{
  //Here we define the interface of the object wanted.
  implements Resolve<Server>{

  constructor(private serversService: ServersService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Server> | Promise<Server> | Server {
    /*
     * Because the ActivatedRouteSnapshot is run every time the route is rendered,
     * we do not need a subscriber to check any changes, like we did for the components.
    */
    return this.serversService.getServer(+route.params['id']);
  }
}
