import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router"


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent },
    ]
  },
  {
    path: 'servers', component: ServersComponent, children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent }
    ]
  },
  //This is the component for non existing routes found. (404 error)
  { path: 'not-found', component: PageNotFoundComponent },
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
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
