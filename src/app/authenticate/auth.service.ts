import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as authActions from "./store/auth.actions";

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    tokenTimer: any = null;

    constructor( private store: Store<fromApp.AppState>){}

    setLogoutTimer(expirationDuration: number){
        this.tokenTimer = setTimeout(() => {
            this.store.dispatch(new authActions.Logout());
        }, expirationDuration);
    }

    clearLogoutTimer(){
        if(this.tokenTimer !== null){
            clearTimeout(this.tokenTimer);
        }
    }
}
