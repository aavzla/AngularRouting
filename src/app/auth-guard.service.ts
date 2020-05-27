import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGardService implements CanActivate {

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
}
