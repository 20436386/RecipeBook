export class User{

    // constructor(public email, public id, private _token, private _tokenTimeLimit){}

    // get token(){
    //     // Date.now() Returns the numeric value corresponding to the current time—the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC, with leap seconds ignored.
    //     let tokenExpiration = Date.now() + (3600 * 1000);
    //     if(!this._token || Date.now() > tokenExpiration){
    //         return null;
    //     }
    //     return this._token;
    // }

    constructor(
        public email : string, 
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
        ){}

    get token(){
        // if(!this._token || new Date() > this._tokenExpirationDate){
        //     return null;
        // }
        // return this._token;

        if(new Date() > this._tokenExpirationDate){
            return null;
        }else{
            return this._token;
        }
        
    }

    get tokenTimeout(){
        const timeout = (this._tokenExpirationDate.getTime() - Date.now());
        if(timeout > 0){
            return timeout;
        }else{
            return 0;
        }
    }
}