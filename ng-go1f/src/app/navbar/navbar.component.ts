import { Component, OnInit }    from '@angular/core';
import { BackEndConfigService } from '../back-end-config.service';
import { GithubService }        from '../github.service';
import { AuthService, Auth }    from '../auth.service';
import { Router }               from '@angular/router';
import { forkJoin }             from 'rxjs';

@Component({
    selector    : 'go1f-navbar',
    templateUrl : './navbar.component.html',
    styleUrls   : ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

    public  links         : { url: string, name: string }[];
    public  githubParams  : {[key : string ] : any};
    private userData?     : Auth.UserData;

    constructor(
        private router        : Router,
        private authService   : AuthService,
        private githubService : GithubService,
    ) {

        forkJoin(

            githubService.getState(),
            githubService.getGithubConfig(),
        )
            .subscribe( ([state, githubParams]) => {
                    githubParams.state = state;
                    this.githubParams  = Object.freeze( githubParams );
                }
            );


        this.links = [
            { url: '/tasks',     name: 'Tasks' },
            { url: '/events',    name: 'Events' },
            { url: '/add-task',  name: '+task' },
            { url: '/add-event', name: '+event' },
        ];
    }

    ngOnInit() {
        this.authService.auth()
            .subscribe( ( response: Auth.UserData ) => {
                this.userData = response;
            });
    }
}
