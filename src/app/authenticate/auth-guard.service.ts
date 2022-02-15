import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, take, map } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

    // currentUser: User;
    // userSub: Subscription;

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log("inside can activate")
        return this.authService.user.pipe(take(1), map(user => {
            console.log(user);
            if(user !== null){
                return true;
            }else{
                return this.router.createUrlTree(['/authorize']);
            }
        }));
    }
}