import { Component, OnInit }    from '@angular/core';
import { BackEndConfigService } from '../back-end-config.service';
import { Router }               from '@angular/router';

@Component({
    selector: 'go1f-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

    public  links         : { url: string, name: string }[];
    private backEndConfig : {[key : string ] : any};
    public  githubParams  : {[key : string ] : any};

    constructor(
        private backEndConfigService : BackEndConfigService,
        private router               : Router
    ) {

        this
            .backEndConfigService
            .getConfig()
            .subscribe( d => {
                this.backEndConfig           = Object.freeze(d);
                this.githubParams = Object.assign(this.backEndConfig.github);
                this.githubParams.state     = Math.random().toString(36).substring(2);
            });

        this.links = [
            { url: '/', name: 'Home' },
            { url: '/stfu', name: 'STFU' },
        ];
    }

    ngOnInit() {}

}
