import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGardService } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ServerResolver } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent },
    ]
  },
  {
    path: 'servers',
    //Here the canACtivate is applied to the servers route level, so every child will have the same behavior.
    //canActivate: [AuthGardService],
    //Here the canACtivateChild is applied to the servers childs levels only. The path to /servers will be allowed.
    canActivateChild: [AuthGardService],
    component: ServersComponent,
    children: [
      {
        path: ':id',
        component: ServerComponent,
        resolve: { server: ServerResolver }
      },
      {
        path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  //This is the component for non existing routes found. (404 error)
  {
    path: 'not-found',
    component: PageNotFoundComponent,
    data: { message: 'This page was not found!'}
  },
  /*
   * This must be always the last route in the configurations of the routes,
   * because all configuration routes are registred from top to bottom and
   * for example if this is at the beggining, all routes will be redirected.
   *
   * Here we use wildcard ** to express anything typed in the URL (Alphanumeric, special chars, etc.)
   */
  { path: '**', redirectTo: '/not-found' },

  /*
   * See bellow, these are the cases to test redirection.
   * If we comment the first path(with the path ''), try to use any of the redirections bellow(one at a time).
  */

  /*
   * This is the case without the pathMatch option, this will throw the following error:
   * Error: Invalid configuration of route '{path: "", redirectTo: "/not-found"}':please provide 'pathMatch'.
   * The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.
  */
  //{ path: '', redirectTo: '/not-found' }

  //This is the case with pathMatch option, please visit https://angular.io/api/router/Route#pathMatch.
  //{ path: '', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)

    /*
     * In deployments to a real server, the route of the application will be handled first by the server, then by the app.
     * So, for any errors found by the server, like 404, we need to set up the error handling to return the index.html file of our app.
     * This, will allow that the app will handle the errors and not the server hosting.
     * This is the case, we can't set up this or we need to support old browsers that doesn't know how to handle routing.
     * This config will add a # after the root of our app, therefore the hosting server will resolve only the root of our app and discard the rest of the URL.
     * Then the app will get the full URL and will continue to resolve the route.
    */
    //RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
