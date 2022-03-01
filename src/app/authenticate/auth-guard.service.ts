import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, take, map } from "rxjs";
import { AuthService } from "./auth.service";
import * as fromApp from "../store/app.reducer";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

    // currentUser: User;
    // userSub: Subscription;

    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log("inside can activate")
        return this.store.select("auth").pipe(take(1), map(authState => {
            console.log(authState.user);
            if(authState.user !== null){
                console.log('user not null')
                return true;
            }else{
                console.log('user is null, redirecting')
                return this.router.createUrlTree(['/authorize']);
            }
        }));
    }
}