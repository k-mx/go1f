import { Directive, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: '[go1fExternalUrl]'
})
export class ExternalUrlDirective {

    constructor( private el: ElementRef, private router: Router ) { }
    @HostListener( 'click', ['$event'] )
    clicked( event: Event ) {
        const url = this.el.nativeElement.href;
        // TODO if null?
        this.router.navigate(['/externalRedirect', { externalUrl: url }], {
            skipLocationChange: true,
        });

        event.preventDefault();
    }

}
