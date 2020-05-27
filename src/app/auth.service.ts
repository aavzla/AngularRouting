//This is a fake Auth service.
export class AuthService {
  loggedIn: boolean = false;

  //This method will validate the status if it is logged in or not.
  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
            resolve(this.loggedIn);
          }, 800);
      }
    );

    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
