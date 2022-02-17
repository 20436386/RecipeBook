import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, throwError, tap,  } from "rxjs";
import { User } from "./user.model";
import { environment } from "src/environments/environment";

export interface authResponseData{
    idToken: 	string, 
    email: 	string, 	
    refreshToken: string, 	
    expiresIn: 	string ,
    localId: 	string,
    registered?: boolean
}

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    user = new BehaviorSubject<User>(null);
    tokenTimer: any = null;

    constructor(private http: HttpClient, private router: Router){}

    signUp(body: {email: string, password: string}){
        body['returnSecureToken'] = true;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey; 
        return this.http.post<authResponseData>(url, body)
        .pipe(catchError(this.errorParse), tap(resData => this.handleAuth(resData))); 
    }

    signIn(body: {email: string, password: string}){
        body['returnSecureToken'] = true;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey; 
        return this.http.post<authResponseData>(url, body)
        .pipe(catchError(this.errorParse), tap(resData => this.handleAuth(resData))); 
    }

    autoLogin(){
        const userData: {email: string, id: string, _token: string,_tokenExpirationDate: string } = JSON.parse(localStorage.getItem('userData'));
        // console.log(userData);
        if(userData === null){
            // console.log(" No user data in local storage")
            return;
        }else{
            //Create new user object and determine if token is valid
            const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
            if(loadedUser.token != null){
                this.user.next(loadedUser);
                let tokenTimeout = loadedUser.tokenTimeout
                if(tokenTimeout){
                    // console.log("Time left in session:", (tokenTimeout/1000)/60, 'minutes');
                    this.autoLogout(tokenTimeout);
                }else{
                    this.signOut();
                }
            }
        }
    }

    signOut(){
        this.user.next(null);
        localStorage.removeItem('userData');
        if(this.tokenTimer !== null){
            clearTimeout(this.tokenTimer);
            this.tokenTimer = null;
        }
        //This is done here and not in the header so that rerouting can occur when token expires
        this.router.navigate(['/authorize']);
    }

    autoLogout(expirationDuration: number){
        this.tokenTimer = setTimeout(() => {
            this.signOut();
        }, expirationDuration);
    }

    private handleAuth(resData: authResponseData){

        const expirationDate = new Date(Date.now() + (+resData.expiresIn * 1000));
        const user = new User(resData.email,
            resData.localId,
            resData.idToken,
            expirationDate);
        this.user.next(user);
        this.autoLogout(+resData.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private errorParse(errorRes: HttpErrorResponse){
        // This code is placed in the service file, as code in the component should be primarily focused on updating the UI
        console.log("In observer error auth.service.ts")
        let errorResponseMessage = "An unknown error has ocurred!";
        console.log(errorResponseMessage);
        if(!errorRes.error || !errorRes.error.error){
            console.log("error wrong format auth.service.ts")
            console.log(errorRes);
            return throwError(() => errorResponseMessage);
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
        return throwError(() => errorResponseMessage);
    }

}

// Less complicated, less DRY
// export class AuthService{

//     constructor(private http: HttpClient){}

//     signUp(body: {email: string, password: string}){
//         body['returnSecureToken'] = true;
//         let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API KEY]'; 
//         return this.http.post<authResponseData>(url, body)
//         .pipe(catchError(errorRes => {
//             // This code is placed in the service file, as code in the component should be primarily focused on updating the UI

//             console.log(errorRes.error.error.message);
//             let errorResponseMessage = "An unknown error has ocurred!";
//             if(!errorRes.error || !errorRes.error.error){
//                 return throwError(() => errorResponseMessage);
//             }

//             switch(errorRes.error.error.message){
//             case 'EMAIL_EXISTS': errorResponseMessage = "That email address is already in use by another account.";
//               break;
//             case 'OPERATION_NOT_ALLOWED': errorResponseMessage = "Password sign-in is disabled for this project.";
//               break;
//             case 'TOO_MANY_ATTEMPTS_TRY_LATER': errorResponseMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
//               break;
//           }

//           return throwError(() => errorResponseMessage);
//         }))
//     }

    // signIn(body: {email: string, password: string}){
    //     body['returnSecureToken'] = true;
    //     let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API KEY]'; 
    //     return this.http.post<authResponseData>(url, body)
    //     .pipe(catchError(errorRes => {
    //         // This code is placed in the service file, as code in the component should be primarily focused on updating the UI
            
    //         console.log(errorRes.error.error.message);
    //         let errorResponseMessage = "An unknown error has ocurred!";
    //         if(!errorRes.error || !errorRes.error.error){
    //             return throwError(() => errorResponseMessage);
    //         }

    //         switch(errorRes.error.error.message){
    //         case 'EMAIL_NOT_FOUND': errorResponseMessage = "There is no user record corresponding to this email address. The user may have been deleted.";
    //           break;
    //         case 'INVALID_PASSWORD': errorResponseMessage = "The password is invalid or the user does not have a password.";
    //           break;
    //         case 'USER_DISABLED': errorResponseMessage = "The user account has been disabled by an administrator";
    //           break;
    //       }

    //       return throwError(() => errorResponseMessage);
    //     }))

    // }

// }