import { Component, OnInit }    from '@angular/core';
import { BackEndConfigService } from '../back-end-config.service';
import { GithubService }        from '../github.service';
import { Router }               from '@angular/router';
import { forkJoin }             from 'rxjs';

@Component({
    selector: 'go1f-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

    public  links         : { url: string, name: string }[];
    public  githubParams  : {[key : string ] : any};

    constructor(
        private router               : Router,
        private githubService        : GithubService,
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
            { url: '/', name: 'Home' },
            { url: '/stfu', name: 'STFU' },
        ];
    }

    ngOnInit() {}

}
