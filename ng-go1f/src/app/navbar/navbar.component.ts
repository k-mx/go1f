import { Component, OnInit } from '@angular/core';
import { BackEndConfigService } from '../back-end-config.service';

@Component({
    selector: 'go1f-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

    public links : { url: string, name: string }[];

    constructor(
        private backEndConfigService: BackEndConfigService
    ) { }

    ngOnInit() {

        this
            .backEndConfigService
            .getConfig()
            .subscribe( d => {
                console.log(d);
            }
            );

        this.links = [
            { url: '/', name: 'Home' },
            { url: '/stfu', name: 'STFU' },
        ];
    }

}
