import { Injectable }           from '@angular/core';
import { HttpClient }           from '@angular/common/http';
import { BackEndConfigService } from './back-end-config.service';
import { map }                  from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GithubService {

    constructor(
        private http:          HttpClient,
        private backendConfig: BackEndConfigService,
    ) {}

    getState() {
        return this.http.get(
            '/ng-services/github/oauth-state',
            { responseType: 'text'},
        );
    }

    getGithubConfig() {

        return this.backendConfig
            .getConfig()
            .pipe(
                map( (d: any) => d.github )
            );
    }
}
