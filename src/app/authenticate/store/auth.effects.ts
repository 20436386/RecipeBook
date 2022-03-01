import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import * as authActions from "../store/auth.actions";
import { environment } from "src/environments/environment";
import { User } from "../user.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

export interface authResponseData{
    idToken: 	string, 
    email: 	string, 	
    refreshToken: string, 	
    expiresIn: 	string ,
    localId: 	string,
    registered?: boolean
}

const handleAuth = (resData: any) => {
    const expirationDate = new Date(Date.now() + (+resData.expiresIn * 1000));
    const user = new User(resData.email,
        resData.localId,
        resData.idToken,
        expirationDate
    );
    localStorage.setItem('userData', JSON.stringify(user));
    return new authActions.AuthenticateSuccess(user);
}

const handleError = (errorRes: HttpErrorResponse) => {
                    
    let errorResponseMessage = "An unknown error has ocurred!";
    if(!errorRes.error || !errorRes.error.error){
        console.log("error wrong format auth.service.ts")
        console.log(errorRes);
        return of(new authActions.AuthenticateFail(errorResponseMessage));
    }
    console.log(errorRes.error.error.message);

    switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS': errorResponseMessage = "That email address is already in use by another account.";
            break;
        case 'OPERATION_NOT_ALLOWED': errorResponseMessage = "Password sign-in is disabled for this project.";
            break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER': errorResponseMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
            break;
        //Note! it is common practice not to give away a hint as to wether the email or password was incorrect.
        // case 'EMAIL_NOT_FOUND': errorResponseMessage = "There is no user record corresponding to this email address. The user may have been deleted.";
        case 'EMAIL_NOT_FOUND': errorResponseMessage = "Email address or password is incorrect.";
            break;
        // case 'INVALID_PASSWORD': errorResponseMessage = "The password is invalid or the user does not have a password.";
        case 'INVALID_PASSWORD': errorResponseMessage = "Email address or password is incorrect.";
            break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER" : errorResponseMessage = "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
            break;
        case 'USER_DISABLED': errorResponseMessage = "The user account has been disabled by an administrator";
            break;
    }
    console.log(errorResponseMessage);
    return of(new authActions.AuthenticateFail(errorResponseMessage));
}

@Injectable()
export class AuthEffects {
    
    authLogin = createEffect(() => {
        return this.actions$.pipe(
            ofType(authActions.LOGIN_START),
            switchMap((authData: authActions.LoginStart) => {

                let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey; 
                return this.http.post<authResponseData>(
                    url, 
                    {email: authData.payload.email, password: authData.payload.password, returnSecureToken: true}
                )
                .pipe(
                    tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    // this.authService.setLogoutTimer(5 * 1000);
                }),                    
                map(resData => {
                    return handleAuth(resData);
                }),catchError((errorRes: HttpErrorResponse) => {
                    return handleError(errorRes);
                    })
                );
            })
        );
    });

    authAutoLogin = createEffect(() => {
        return this.actions$.pipe(
            ofType(authActions.AUTO_LOGIN),
            map(() => {
                const userData: {email: string, id: string, _token: string,_tokenExpirationDate: string } = JSON.parse(localStorage.getItem('userData'));
                // console.log(userData);
                if(userData === null){
                    // console.log(" No user data in local storage")
                    //can return dummy action:
                    return {type: 'DUMMY'}
                    // return new authActions.Logout();
                }else{
                    //Create new user object and determine if token is valid
                    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
                    if(loadedUser.token !== null){

                        this.authService.setLogoutTimer(loadedUser.tokenTimeout);
                        return  new authActions.AuthenticateSuccess(loadedUser);
                    }else{
                        return new authActions.Logout();
                    }
                }
            })
        )
    })

    authLogout = createEffect(() => {
        return this.actions$.pipe(
            ofType(authActions.LOGOUT),
            tap((authData: authActions.Logout) => {
                this.authService.clearLogoutTimer();
                localStorage.removeItem('userData');
                this.router.navigate(['/authorize'])
            })
        )
    }, {dispatch: false})

    authSuccess = createEffect(() => {
        return this.actions$.pipe(
            ofType(authActions.AUTHENTICATE_SUCCESS),
            tap(() => {
                console.log("inside authRedirect effect");
                this.router.navigate(['/'], {skipLocationChange: true});
                })
            );
    }, {dispatch: false});

    authRegister = createEffect(() => {
        return this.actions$.pipe(
            ofType(authActions.REGISTER_START),
            switchMap((authData: authActions.RegisterStart) => {
                let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey; 
                return this.http.post<authResponseData>(
                    url,
                    {email: authData.payload.email, password: authData.payload.password, returnSecureToken: true}
                )
                .pipe(
                    tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    // this.authService.setLogoutTimer(5 * 1000);
                }),
                map(resData => {
                    return handleAuth(resData); 
                }), catchError((errorRes: HttpErrorResponse) => {
                    return handleError(errorRes);
                })); 
            })
        )
    })
    
    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService){}
}