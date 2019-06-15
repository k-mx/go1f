import { Component, OnInit, HostListener, Input } from '@angular/core';
import {
    trigger,
    style,
    state,
    animate,
    transition,
    useAnimation,
    query,
} from '@angular/animations';

@Component({
    selector:    'go1f-text-input',
    templateUrl: './text-input.component.html',
    styleUrls:   ['./text-input.component.css'],
    animations:  [
        trigger('labelAnimation', [
            state('in',
                style({
                    transform: 'translateY(-100%) scale(0.7)',
                    'transform-origin': 'top left',
                    color: 'var(--dark-green-bg)',
                })
            ),
            transition('*=>*', [  animate('0.1s') ]),
        ]),
        trigger('borderAnimation', [
            state('in', style({ width: '100%' }) ),
            transition('*=>*', [  animate('0.1s') ]),
        ]),
    ],

})
export class TextInputComponent implements OnInit {

    @Input() name : string;
    @Input() label : string;
    public state : boolean = false;

    constructor() { }

    ngOnInit() {
    }

    @HostListener('focusin')
    @HostListener('focusout')
    onFocusField() {
        this.state = !this.state;
    }
}
