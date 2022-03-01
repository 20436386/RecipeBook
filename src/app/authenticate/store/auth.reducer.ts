import { User } from "../user.model";
import * as authActions from 'src/app/authenticate/store/auth.actions';

export interface State {
    user: User,
    authError: string,
    loading: boolean
} 

const initialState: State = {
    user: null,
    authError: null,
    loading: false
}

export function authReducer(state: State = initialState, action: authActions.authActions){
    
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){

        case authActions.LOGIN_START:
        case authActions.REGISTER_START:
            //This code will execute for both cases above
            newState.authError = null;
            newState.loading = true;
            Object.freeze(newState);
            return newState;

        case authActions.AUTHENTICATE_SUCCESS:
            console.log("inside AuthenticateSuccess case in reducer");
            newState.user = action.payload;
            newState.loading = false;
            Object.freeze(newState);
            return newState;

        case authActions.AUTHENTICATE_FAIL:
            newState.user = null;
            newState.authError = action.payload;
            newState.loading = false;
            Object.freeze(newState);
            return newState;
        
        case authActions.LOGOUT:
            console.log("inside logout case in reducer");
            newState.user = null;
            Object.freeze(newState);
            return newState;

        default:
            return state;
    }

}