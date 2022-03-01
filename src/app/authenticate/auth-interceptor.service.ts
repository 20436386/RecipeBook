import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";
import * as fromApp from "../store/app.reducer";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    // private token: string;

    constructor(private authService: AuthService, private store: Store<fromApp.AppState>){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return this.store.select("auth").pipe(
            take(1), 
            map(authState => {
                return authState.user;
            }),
            exhaustMap(user => {
            if(user !== null){
                const modifiedRequest = req.clone({params: req.params.append('auth', user.token)});
                return next.handle(modifiedRequest); 
            }else{
                return next.handle(req); 
            }
        }));

        //My method
        // this.authService.user.pipe(take(1)).subscribe({
        //     next: (user) => {
        //         this.token = user.token;
        //     }
        // })
        // let modifiedRequest = req.clone({
        //     params: req.params.append('auth', this.token)
        // });
        // return next.handle(modifiedRequest);
    }
}