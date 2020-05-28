import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGardService implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    //These console logs are to show these objects. These are
    //console.log(this.constructor.name + ' ActivatedRouteSnapshot.', route);
    //console.log(this.constructor.name + ' RouterStateSnapshot.', state);

    /*
     * Here we check the status that will return a promise with the response.
     * Then, we use the response and verify if we return true to allow the route to continue to load the component
     * Or, we go and navigate to the home page and return false to stop the navigation to the original component.
    */
    return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
        }
      );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    //Here we call canActivate, because it is still the same logic needed.
    //We need to send the route and status, because it is mandatory for the method.
    return this.canActivate(route, state);
  }
}
