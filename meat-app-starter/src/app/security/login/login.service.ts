import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import { MEAT_API } from "app/app.api";
import { User } from "app/security/login/user.model";
import { tap, filter} from 'rxjs/operators'
import { Router, NavigationEnd } from "@angular/router";

@Injectable()
export class LoginService {

  loggedUser: User
  lastUrl: string

  constructor(private http: HttpClient, private router: Router){
    this.router.events
    .pipe(filter(e => e instanceof NavigationEnd))
    .subscribe((e: NavigationEnd) => this.lastUrl = e.url)
  }

  isLoggedIn(){
    return this.loggedUser !== undefined
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${MEAT_API}/login`, {email: email, password: password})
    .pipe(tap(user => this.loggedUser = user))
  }

  handleLogin(path: string = this.lastUrl){
    this.router.navigate(['/login', btoa(path)])
  }

  logout() {
    this.loggedUser = undefined
  }

}
