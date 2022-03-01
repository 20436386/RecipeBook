import { Action } from "@ngrx/store";
import { User } from "../user.model";


export const LOGIN_START = '[Authenticated] LOGIN_START';
export const AUTHENTICATE_SUCCESS = '[Authenticate] AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAIL =  '[Authenticate] AUTHENTICATE_FAIL';
export const REGISTER_START = '[Authenticate] REGISTER_START';
export const AUTO_LOGIN = '[Authenticate] AUTO_LOGIN';
export const LOGOUT = '[Authenticate] LOGOUT';

export class LoginStart implements Action{
    readonly type = LOGIN_START;
    constructor(public payload: {email: string, password: string}){}
}

export class AuthenticateSuccess implements Action{
    readonly type = AUTHENTICATE_SUCCESS;
    constructor(public payload: User){}
}

export class AuthenticateFail implements Action{
    readonly type = AUTHENTICATE_FAIL
    constructor(public payload: string){}
}

export class RegisterStart implements Action{
    readonly type = REGISTER_START;
    constructor(public payload: {email: string, password: string}){}
}

export class AutoLogin implements Action{
    readonly type = AUTO_LOGIN
}

export class Logout implements Action{
    readonly type = LOGOUT;
}

export type authActions = LoginStart|  AuthenticateSuccess | Logout | AuthenticateFail | RegisterStart | AutoLogin;