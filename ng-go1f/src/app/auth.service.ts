import { Injectable }           from '@angular/core';
import { HttpClient }           from '@angular/common/http';

// TODO how to automaticallu export namespaces?
export namespace Auth {

    export interface UserData {
        avatar_url : string,
        login      : string,
        name       : string,
    }

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor( private http: HttpClient ) { }

    auth() { return this.http.get( 'ng-services/auth' ) }
}
