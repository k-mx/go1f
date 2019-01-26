import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackEndConfigService {

    constructor( private http: HttpClient ) { }

    getConfig() {
        return this.http.get('/ng-services/config-service');
    }
}
